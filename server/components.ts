/**
 * Component Registry
 *
 * Загружает React компоненты из бандла и регистрирует их для SSR.
 * Бандл экспортирует компоненты в global объект.
 */

import type { ComponentType } from 'react';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { logger } from './utils/logger';

// Known Bun/Node built-ins to exclude when scanning globals
const BUILT_INS = new Set([
  'File', 'Blob', 'Buffer', 'BuildError', 'BuildMessage', 'Crypto', 'HTMLRewriter',
  'Request', 'ResolveError', 'ResolveMessage', 'Response', 'TextDecoder', 'AbortController',
  'AbortSignal', 'BroadcastChannel', 'TextEncoder', 'URL', 'URLSearchParams', 'Headers',
  'FormData', 'Event', 'EventTarget', 'MessageEvent', 'CloseEvent', 'ErrorEvent',
  'WebSocket', 'Worker', 'SharedWorker', 'MessageChannel', 'MessagePort', 'Intl',
  'Map', 'Set', 'WeakMap', 'WeakSet', 'Promise', 'Proxy', 'Reflect', 'Symbol',
  'Array', 'Object', 'String', 'Number', 'Boolean', 'Date', 'RegExp', 'Error',
  'TypeError', 'RangeError', 'SyntaxError', 'ReferenceError', 'URIError', 'EvalError',
  'Function', 'JSON', 'Math', 'ArrayBuffer', 'DataView', 'Float32Array', 'Float64Array',
  'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint16Array', 'Uint32Array',
  'Uint8ClampedArray', 'BigInt', 'BigInt64Array', 'BigUint64Array', 'FinalizationRegistry',
  'WeakRef', 'AggregateError', 'ReadableStream', 'WritableStream', 'TransformStream',
  'CompressionStream', 'DecompressionStream', 'ByteLengthQueuingStrategy', 'CountQueuingStrategy',
  'Bun', 'BuildArtifact', 'Transpiler', 'FileSystemRouter', 'MatchedRoute', 'Glob',
  'Subprocess', 'SyncSubprocess', 'FFI', 'CString', 'Pointer', 'S3Client', 'S3File',
  'ShellOutput', 'ShellPromise', 'ShellError', 'Server', 'ServerWebSocket', 'Semver',
]);

// Component registry
const registry: Map<string, ComponentType<any>> = new Map();

// Track loading state
type LoadState =
  | { status: 'unloaded' }
  | { status: 'loaded'; count: number }
  | { status: 'error'; message: string };

let loadState: LoadState = { status: 'unloaded' };

/**
 * Загружает компоненты из бандла в реестр.
 * Безопасно вызывать многократно — загрузка произойдёт только один раз.
 *
 * @throws Error если загрузка бандла провалилась
 */
export function loadComponents(): void {
  // Already loaded successfully
  if (loadState.status === 'loaded') {
    return;
  }

  // Previously failed - throw the cached error
  if (loadState.status === 'error') {
    throw new Error(`Component bundle loading failed: ${loadState.message}`);
  }

  const startTime = performance.now();

  // Capture globals before loading
  const globalsBefore = new Set(Object.keys(globalThis));

  try {
    // Load the prerender bundle
    const bundleRelativePath = process.env.NODE_ENV === 'production'
      ? '../dist/store_app_prerender.production.js'
      : '../dist/store_app_prerender.development.js';

    // Resolve absolute path for existence check
    const bundlePath = resolve(dirname(import.meta.path), bundleRelativePath);

    logger.info('Loading bundle', { path: bundlePath });

    // Check if bundle file exists before requiring
    if (!existsSync(bundlePath)) {
      throw new Error(`Bundle file not found: ${bundlePath}. Did you run 'yarn build'?`);
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(bundleRelativePath);

    // Find new globals added by the bundle
    const g = globalThis as Record<string, any>;
    const newGlobals = Object.keys(g).filter(k => !globalsBefore.has(k));

    // Filter to find React components (uppercase, function, not built-in)
    for (const name of newGlobals) {
      const value = g[name];
      if (
        typeof value === 'function' &&
        /^[A-Z]/.test(name) &&
        !BUILT_INS.has(name)
      ) {
        registry.set(name, value as ComponentType<any>);
      }
    }

    const duration = performance.now() - startTime;
    loadState = { status: 'loaded', count: registry.size };

    logger.info('Components loaded successfully', {
      count: registry.size,
      duration_ms: Math.round(duration),
      components: Array.from(registry.keys()).slice(0, 10).join(', ') + '...',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    logger.error('FATAL: Failed to load components from bundle', {
      error: errorMessage,
      stack: errorStack,
    });

    // Store error state to prevent retry loops, but still throw
    loadState = { status: 'error', message: errorMessage };
    throw new Error(`Component bundle loading failed: ${errorMessage}`);
  }
}

/**
 * Проверяет, загружены ли компоненты успешно.
 */
export function isComponentsLoaded(): boolean {
  return loadState.status === 'loaded';
}

/**
 * Возвращает информацию о состоянии загрузки.
 */
export function getLoadState(): LoadState {
  return loadState;
}

/**
 * Получает компонент по имени.
 * @throws Error если компоненты не загружены
 */
export function getComponent(name: string): ComponentType<any> | undefined {
  if (loadState.status !== 'loaded') {
    loadComponents();
  }
  return registry.get(name);
}

/**
 * Проверяет, зарегистрирован ли компонент.
 */
export function hasComponent(name: string): boolean {
  if (loadState.status !== 'loaded') {
    loadComponents();
  }
  return registry.has(name);
}

/**
 * Возвращает список всех зарегистрированных компонентов.
 */
export function getComponentNames(): string[] {
  if (loadState.status !== 'loaded') {
    loadComponents();
  }
  return Array.from(registry.keys()).sort();
}

/**
 * Возвращает количество зарегистрированных компонентов.
 */
export function getComponentCount(): number {
  if (loadState.status !== 'loaded') {
    loadComponents();
  }
  return registry.size;
}

/**
 * Регистрирует компонент вручную.
 * Полезно для тестирования или добавления компонентов вне бандла.
 */
export function registerComponent(name: string, component: ComponentType<any>): void {
  registry.set(name, component);
  logger.debug('Component registered manually', { name });
}

/**
 * Очищает реестр. Используется для тестирования.
 */
export function clearRegistry(): void {
  registry.clear();
  loadState = { status: 'unloaded' };
}
