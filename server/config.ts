/**
 * SSR Server Configuration
 *
 * Конфигурация загружается из ENV переменных при старте сервера.
 * Эти значения ранее брались из gon.* на клиенте.
 */

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
export const config: AppConfig = {
  assetHost: process.env.ASSET_HOST || '',
  thumborUrl: process.env.THUMBOR_URL || '',
  maxItemsCount: parseInt(process.env.MAX_ITEMS_COUNT || '100', 10),
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
    console.warn('[SSR Config] Warnings:');
    warnings.forEach((w) => console.warn(`  - ${w}`));
  }
}

/**
 * Получить конфигурацию для передачи в React context.
 * Используется в SSR render pipeline.
 */
export function getConfigForContext(): AppConfig {
  return { ...config };
}
