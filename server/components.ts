/**
 * Component Registry
 *
 * Загружает React компоненты из бандла и регистрирует их для SSR.
 * Бандл экспортирует компоненты в global объект.
 */

import type { ComponentType } from 'react';
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

// Track if components have been loaded
let componentsLoaded = false;

/**
 * Загружает компоненты из бандла в реестр.
 * Безопасно вызывать многократно — загрузка произойдёт только один раз.
 */
export function loadComponents(): void {
  if (componentsLoaded) {
    return;
  }

  const startTime = performance.now();

  // Capture globals before loading
  const globalsBefore = new Set(Object.keys(globalThis));

  try {
    // Load the prerender bundle
    const bundlePath = process.env.NODE_ENV === 'production'
      ? '../dist/store_app_prerender.production.js'
      : '../dist/store_app_prerender.development.js';

    logger.info('Loading bundle', { path: bundlePath });

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(bundlePath);

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
    componentsLoaded = true;

    logger.info('Components loaded successfully', {
      count: registry.size,
      duration_ms: Math.round(duration),
      components: Array.from(registry.keys()).slice(0, 10).join(', ') + '...',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Failed to load components from bundle', { error: errorMessage });

    // Mark as loaded to prevent retry loops
    componentsLoaded = true;
  }
}

/**
 * Получает компонент по имени.
 */
export function getComponent(name: string): ComponentType<any> | undefined {
  if (!componentsLoaded) {
    loadComponents();
  }
  return registry.get(name);
}

/**
 * Проверяет, зарегистрирован ли компонент.
 */
export function hasComponent(name: string): boolean {
  if (!componentsLoaded) {
    loadComponents();
  }
  return registry.has(name);
}

/**
 * Возвращает список всех зарегистрированных компонентов.
 */
export function getComponentNames(): string[] {
  if (!componentsLoaded) {
    loadComponents();
  }
  return Array.from(registry.keys()).sort();
}

/**
 * Возвращает количество зарегистрированных компонентов.
 */
export function getComponentCount(): number {
  if (!componentsLoaded) {
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
  componentsLoaded = false;
}
