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
import { ConfigProvider } from './contexts/ConfigContext';
import { config as serverConfig } from './config';
import type { SsrContext, AppConfig } from './types/context';

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

/**
 * Base properties shared by all render results
 */
interface BaseRenderResult {
  /** Время рендеринга в мс */
  duration: number;
}

/**
 * Result when streaming is enabled (regular users)
 * Streaming is only for non-crawlers
 */
interface StreamingRenderResult extends BaseRenderResult {
  /** ReadableStream для streaming response */
  html: ReadableStream<Uint8Array>;
  isStreaming: true;
  isCrawler: false;
  crawlerName: null;
}

/**
 * Result for crawlers (full HTML, no streaming)
 */
interface CrawlerRenderResult extends BaseRenderResult {
  /** Full HTML string */
  html: string;
  isStreaming: false;
  isCrawler: true;
  /** Crawler name is always present for crawlers */
  crawlerName: string;
}

/**
 * Result for regular users when waitForAll is forced
 */
interface FullRenderResult extends BaseRenderResult {
  /** Full HTML string */
  html: string;
  isStreaming: false;
  isCrawler: false;
  crawlerName: null;
}

/**
 * Discriminated union type for render results.
 * Ensures type safety: streaming results have ReadableStream,
 * non-streaming have string, crawlers always have crawlerName.
 */
export type RenderResult = StreamingRenderResult | CrawlerRenderResult | FullRenderResult;

// Re-export component functions for backward compatibility
export { getComponentNames as getRegisteredComponents } from './components';
export { loadComponents as loadComponentsFromBundle } from './components';

/**
 * Создаёт React element с ConfigContext provider.
 * Оборачивает компонент в ConfigProvider с полной конфигурацией.
 */
function createElementWithContext(
  Component: React.ComponentType<any>,
  props: Record<string, unknown>,
  ssrContext: SsrContext
): React.ReactElement {
  // Формируем полный AppConfig из SsrContext + серверных настроек
  const fullConfig: AppConfig = {
    ...ssrContext,
    assetHost: serverConfig.assetHost,
    thumborUrl: serverConfig.thumborUrl,
    maxItemsCount: serverConfig.maxItemsCount,
    fallbackProductImage: serverConfig.fallbackProductImage,
  };

  // Оборачиваем компонент в ConfigProvider
  return React.createElement(
    ConfigProvider,
    { config: fullConfig },
    React.createElement(Component, props)
  );
}

/**
 * Рендерит компонент с использованием streaming.
 *
 * Для обычных пользователей используется streaming с Suspense.
 * Для crawlers используется waitForAll чтобы они получили полный HTML.
 *
 * @param componentName - Имя React компонента для рендеринга
 * @param props - Пропсы компонента
 * @param context - SSR контекст (vendor, locale, translations, currency, accountingSettings)
 * @param options - Опции рендеринга (timeout, waitForAll, userAgent, requestId)
 */
export async function renderComponent(
  componentName: string,
  props: Record<string, unknown>,
  context: SsrContext,
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
    const element = createElementWithContext(Component, props, context);

    if (shouldWaitForAll) {
      // Для crawlers или принудительного waitForAll: полный рендеринг без streaming
      const html = await renderWithTimeout(element, timeout, requestId);
      const duration = performance.now() - start;

      logger.info('Render completed (full)', {
        component: componentName,
        requestId,
        duration_ms: Math.round(duration),
      });

      // Return appropriate discriminated union variant
      if (crawlerDetected && crawlerName) {
        return {
          html,
          isStreaming: false,
          duration,
          isCrawler: true,
          crawlerName,
        } satisfies CrawlerRenderResult;
      } else {
        return {
          html,
          isStreaming: false,
          duration,
          isCrawler: false,
          crawlerName: null,
        } satisfies FullRenderResult;
      }
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
        isCrawler: false,
        crawlerName: null,
      } satisfies StreamingRenderResult;
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
 *
 * ВАЖНО: renderToString синхронный и блокирует event loop.
 * Timeout через setTimeout НЕ СРАБОТАЕТ если компонент содержит
 * бесконечный цикл или очень долгую синхронную операцию.
 * Timeout работает только для protection от "забытого" clearTimeout.
 *
 * Для реального timeout protection нужен Worker thread,
 * что добавляет значительную сложность. Текущая реализация
 * достаточна для большинства случаев, где компоненты нормально рендерятся.
 *
 * @see https://github.com/facebook/react/issues/20669 - React SSR timeout discussion
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
      // renderToString - синхронный, блокирует event loop
      // Timeout выше - защита только от "забытого" clearTimeout,
      // не от бесконечных циклов в компонентах
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
