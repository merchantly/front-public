/**
 * SSR Server Configuration
 *
 * Конфигурация загружается из ENV переменных при старте сервера.
 * Эти значения ранее брались из gon.* на клиенте.
 */

import { logger } from './utils/logger';

export interface AppConfig {
  /** CDN хост для статических ресурсов (gon.asset_host) */
  assetHost: string;

  /** URL Thumbor сервера для обработки изображений (gon.thumbor_url) */
  thumborUrl: string;

  /** Максимальное количество товаров в корзине (gon.max_items_count) */
  maxItemsCount: number;
}

/**
 * Глобальная конфигурация SSR сервера.
 * Инициализируется при старте из ENV переменных.
 */
/**
 * Безопасный парсинг числа из ENV с дефолтным значением.
 */
function parseIntSafe(value: string | undefined, defaultValue: number): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || parsed <= 0) {
    logger.warn('Invalid number in config', { value, defaultValue });
    return defaultValue;
  }
  return parsed;
}

export const config: AppConfig = {
  assetHost: process.env.ASSET_HOST || '',
  thumborUrl: process.env.THUMBOR_URL || '',
  maxItemsCount: parseIntSafe(process.env.MAX_ITEMS_COUNT, 100),
};

/**
 * Валидация конфигурации при старте.
 * Выводит warnings для отсутствующих переменных.
 */
export function validateConfig(): void {
  const warnings: string[] = [];

  if (!config.assetHost) {
    warnings.push('ASSET_HOST not set, using relative paths for assets');
  }

  if (!config.thumborUrl) {
    warnings.push('THUMBOR_URL not set, image processing may not work');
  }

  if (warnings.length > 0) {
    logger.warn('Config validation warnings', { warnings });
  }
}

/**
 * Получить конфигурацию для передачи в React context.
 * Используется в SSR render pipeline.
 */
export function getConfigForContext(): AppConfig {
  return { ...config };
}
