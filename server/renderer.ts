/**
 * SSR Streaming Renderer
 *
 * Использует React 18 renderToReadableStream для streaming SSR.
 * Поддерживает Suspense boundaries и fallback на полный рендеринг для crawlers.
 */

import React from 'react';
// Bun использует browser API, поэтому импортируем из server.browser
// renderToReadableStream доступен только в browser/edge runtime
import { renderToReadableStream } from 'react-dom/server.browser';
import { renderToString } from 'react-dom/server';
import { isCrawler, getCrawlerName } from './utils/crawlers';
import { logger } from './utils/logger';
import {
  getComponent,
  getComponentNames,
  getComponentCount,
  loadComponents,
} from './components';

// Custom error types for proper HTTP status codes
export class ComponentNotFoundError extends Error {
  constructor(public componentName: string, public availableComponents: string[]) {
    super(`Component "${componentName}" is not registered`);
    this.name = 'ComponentNotFoundError';
  }
}

export class RenderError extends Error {
  constructor(public componentName: string, public originalError: Error | string) {
    const message = originalError instanceof Error ? originalError.message : originalError;
    super(`Failed to render component "${componentName}": ${message}`);
    this.name = 'RenderError';
  }
}

// Types
export interface RenderOptions {
  /** Timeout в миллисекундах */
  timeout?: number;
  /** Принудительно ждать весь контент (для crawlers) */
  waitForAll?: boolean;
  /** User-Agent для определения crawler */
  userAgent?: string;
  /** Request ID для логирования */
  requestId?: string;
}

export interface RenderResult {
  /** HTML строка или ReadableStream */
  html: string | ReadableStream<Uint8Array>;
  /** Streaming или полный рендеринг */
  isStreaming: boolean;
  /** Время рендеринга в мс */
  duration: number;
  /** Был ли определён crawler */
  isCrawler: boolean;
  /** Название crawler если определён */
  crawlerName: string | null;
}

// Re-export component functions for backward compatibility
export { getComponentNames as getRegisteredComponents } from './components';
export { loadComponents as loadComponentsFromBundle } from './components';

/**
 * Создаёт React element с ConfigContext provider.
 */
function createElementWithContext(
  Component: React.ComponentType<any>,
  props: Record<string, unknown>
): React.ReactElement {
  // Пропсы уже должны содержать всё необходимое из Rails
  // ConfigContext будет использоваться компонентами через withConfig HOC
  return React.createElement(Component, props);
}

/**
 * Рендерит компонент с использованием streaming.
 *
 * Для обычных пользователей используется streaming с Suspense.
 * Для crawlers используется waitForAll чтобы они получили полный HTML.
 */
export async function renderComponent(
  componentName: string,
  props: Record<string, unknown>,
  options: RenderOptions = {}
): Promise<RenderResult> {
  const start = performance.now();
  const { timeout = 2000, userAgent, requestId = crypto.randomUUID() } = options;

  // Определяем crawler
  const crawlerDetected = isCrawler(userAgent);
  const crawlerName = getCrawlerName(userAgent);
  const shouldWaitForAll = options.waitForAll ?? crawlerDetected;

  logger.info('Render started', {
    component: componentName,
    requestId,
    isCrawler: crawlerDetected,
    crawlerName,
    waitForAll: shouldWaitForAll,
  });

  // Получаем компонент из реестра
  const Component = getComponent(componentName);

  if (!Component) {
    // Выбрасываем ошибку вместо silent fallback
    logger.error('Component not found', {
      component: componentName,
      requestId,
      availableCount: getComponentCount(),
    });
    throw new ComponentNotFoundError(componentName, getComponentNames().slice(0, 20));
  }

  try {
    const element = createElementWithContext(Component, props);

    if (shouldWaitForAll) {
      // Для crawlers: полный рендеринг без streaming
      const html = await renderWithTimeout(element, timeout, requestId);
      const duration = performance.now() - start;

      logger.info('Render completed (full)', {
        component: componentName,
        requestId,
        duration_ms: Math.round(duration),
      });

      return {
        html,
        isStreaming: false,
        duration,
        isCrawler: crawlerDetected,
        crawlerName,
      };
    } else {
      // Для пользователей: streaming
      const stream = await renderToStreamingWithTimeout(element, timeout, requestId);
      const duration = performance.now() - start;

      logger.info('Render started (streaming)', {
        component: componentName,
        requestId,
        duration_ms: Math.round(duration),
      });

      return {
        html: stream,
        isStreaming: true,
        duration,
        isCrawler: crawlerDetected,
        crawlerName,
      };
    }
  } catch (error) {
    const duration = performance.now() - start;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    logger.error('Render failed', {
      component: componentName,
      requestId,
      error: errorMessage,
      stack: errorStack,
      duration_ms: Math.round(duration),
    });

    // Пробрасываем ошибку вместо silent fallback
    // HTTP layer (index.ts) решит что делать - вернуть 500 или placeholder
    throw new RenderError(componentName, error instanceof Error ? error : errorMessage);
  }
}

/**
 * Рендерит в строку с таймаутом (для crawlers).
 */
async function renderWithTimeout(
  element: React.ReactElement,
  timeout: number,
  requestId: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`Render timeout after ${timeout}ms`));
    }, timeout);

    try {
      // renderToString - синхронный, но оборачиваем в Promise для единообразия
      const html = renderToString(element);
      clearTimeout(timeoutId);
      resolve(html);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
}

/**
 * Рендерит в ReadableStream с таймаутом (для пользователей).
 */
async function renderToStreamingWithTimeout(
  element: React.ReactElement,
  timeout: number,
  requestId: string
): Promise<ReadableStream<Uint8Array>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const stream = await renderToReadableStream(element, {
      signal: controller.signal,
      onError(error) {
        const errorStack = error instanceof Error ? error.stack : undefined;
        logger.error('Streaming error', {
          requestId,
          error: String(error),
          stack: errorStack,
        });
        // Abort stream on error to prevent partial/corrupted HTML
        controller.abort();
      },
    });

    clearTimeout(timeoutId);
    return stream;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Создаёт placeholder HTML для client-side hydration.
 */
function createPlaceholder(
  componentName: string,
  props: Record<string, unknown>,
  error?: string
): string {
  const propsJson = JSON.stringify(props || {});
  const escapedProps = escapeHtml(propsJson);

  const errorAttr = error ? ` data-ssr-error="${escapeHtml(error)}"` : '';

  return `<div data-react-class="${componentName}" data-react-props="${escapedProps}" data-ssr-placeholder="true"${errorAttr}></div>`;
}

/**
 * Escape HTML entities.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Batch render нескольких компонентов параллельно.
 */
export async function renderBatch(
  renders: Array<{
    id: string;
    component: string;
    props: Record<string, unknown>;
  }>,
  options: RenderOptions = {}
): Promise<Array<{ id: string; html: string; duration: number; error?: string }>> {
  const results = await Promise.all(
    renders.map(async ({ id, component, props }) => {
      try {
        const result = await renderComponent(component, props, {
          ...options,
          // Batch всегда возвращает строки, не streams
          waitForAll: true,
        });
        return {
          id,
          html: result.html as string,
          duration: result.duration,
        };
      } catch (error) {
        return {
          id,
          html: createPlaceholder(component, props, String(error)),
          duration: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    })
  );

  return results;
}
