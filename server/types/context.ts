/**
 * SSR Context Types
 *
 * Типы для структурированного контекста SSR.
 * Заменяет глобальный объект gon.
 */

/**
 * Настройки дизайна магазина
 */
export interface DesignSettings {
  fontFamily?: string;
  fontColor?: string;
  activeElementsColor?: string;
  logoUrl?: string;
}

/**
 * Настройки валюты
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
 * Настройки форматирования чисел
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
  /** ID магазина */
  id: number;
  /** Базовый URL магазина */
  root_url: string;
  /** URL публичного API */
  public_api_url: string;
  /** URL API для операторов */
  operator_api_url: string;
  /** Настройки дизайна (опционально) */
  design?: DesignSettings;
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
  /** Переводы строк */
  translations: Record<string, unknown>;
  /** Настройки валюты */
  currency: CurrencySettings;
  /** Настройки форматирования чисел */
  numberSettings: NumberSettings;
}

/**
 * Helper type для accounting.js (формируется из currency + numberSettings)
 */
export interface AccountingSettings {
  currency: CurrencySettings;
  number: NumberSettings;
}

/**
 * Полная конфигурация приложения
 * Включает SsrContext + серверные настройки
 */
export interface AppConfig extends SsrContext {
  /** CDN хост для статических ресурсов */
  assetHost: string;
  /** URL Thumbor сервера для обработки изображений */
  thumborUrl: string;
  /** Максимальное количество товаров в корзине */
  maxItemsCount: number;
  /** URL изображения-заглушки для товаров без фото */
  fallbackProductImage: string;
}
