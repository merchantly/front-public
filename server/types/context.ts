/**
 * SSR Context Types
 *
 * Типы для структурированного контекста SSR.
 * Содержит ТОЛЬКО поля, реально используемые при рендеринге.
 */

/**
 * Настройки дизайна магазина
 */
export interface DesignSettings {
  /** URL логотипа магазина */
  logoUrl?: string | null;
}

/**
 * Настройки валюты для accounting.js
 */
export interface CurrencySettings {
  /** Символ валюты (₽, $, €) */
  symbol: string;
  /** Формат отображения (%v %s = "100 ₽") */
  format: string;
  /** Десятичный разделитель */
  decimal: string;
  /** Разделитель тысяч */
  thousand: string;
  /** Количество знаков после запятой */
  precision: number;
}

/**
 * Настройки форматирования чисел для accounting.js
 */
export interface NumberSettings {
  /** Количество знаков после запятой */
  precision: number;
  /** Разделитель тысяч */
  thousand: string;
  /** Десятичный разделитель */
  decimal: string;
}

/**
 * Информация о магазине (vendor)
 */
export interface VendorInfo {
  /** URL публичного API */
  public_api_url: string;
  /** URL API для операторов */
  operator_api_url: string;
}

/**
 * Контекст для SSR рендеринга
 * Передаётся из Rails в SSR Server
 */
export interface SsrContext {
  /** Информация о магазине */
  vendor: VendorInfo;
  /** Язык интерфейса (ru, en, uk, kk) */
  locale: string;
  /** Настройки валюты */
  currency: CurrencySettings;
  /** Настройки форматирования чисел */
  numberSettings: NumberSettings;
  /** Настройки дизайна */
  design?: DesignSettings;
}

/**
 * Helper type для accounting.js (формируется из currency + numberSettings)
 */
export interface AccountingSettings {
  currency: CurrencySettings;
  number: NumberSettings;
}

/**
 * Полная конфигурация приложения (__SSR_CONFIG__)
 * Включает SsrContext + серверные настройки
 */
export interface AppConfig extends SsrContext {
  /** CDN хост для статических ресурсов */
  assetHost: string;
  /** URL Thumbor сервера для обработки изображений */
  thumborUrl: string;
  /** Максимальное количество товаров в корзине */
  maxItemsCount: number;
}
