/**
 * SSR Server Configuration
 *
 * Конфигурация загружается из ENV переменных при старте сервера.
 * Эти значения используются для формирования AppConfig при SSR.
 */

import { logger } from './utils/logger';

/**
 * Серверная конфигурация (загружается из ENV)
 * Эти значения добавляются к SsrContext для формирования полного AppConfig
 */
export interface ServerConfig {
  /** CDN хост для статических ресурсов */
  assetHost: string;
  /** URL Thumbor сервера для обработки изображений */
  thumborUrl: string;
  /** Максимальное количество товаров в корзине */
  maxItemsCount: number;
  /** URL изображения-заглушки для товаров без фото */
  fallbackProductImage: string;
}

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

/**
 * Глобальная конфигурация SSR сервера.
 * Инициализируется при старте из ENV переменных.
 */
export const config: ServerConfig = {
  assetHost: process.env.ASSET_HOST || 'https://assets.kiiiosk.store',
  thumborUrl: process.env.THUMBOR_URL || 'https://thumbor.kiiiosk.store',
  maxItemsCount: parseIntSafe(process.env.MAX_ITEMS_COUNT, 100),
  fallbackProductImage: process.env.FALLBACK_PRODUCT_IMAGE || 'https://assets.kiiiosk.store/images/fallback/product-none.png',
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
 * Получить серверную конфигурацию для объединения с SsrContext.
 */
export function getServerConfig(): ServerConfig {
  return { ...config };
}
