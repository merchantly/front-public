/**
 * ConfigContext - React Context для SSR конфигурации
 *
 * Предоставляет доступ к полной конфигурации приложения включая:
 * - vendor: информация о магазине (id, URLs, design)
 * - locale: язык интерфейса
 * - translations: переводы строк
 * - currency: настройки валюты
 * - accountingSettings: настройки для accounting.js
 * - assetHost, thumborUrl, maxItemsCount, fallbackProductImage: серверные настройки
 *
 * На сервере: значения приходят из SsrContext + ENV через ConfigProvider
 * На клиенте: значения загружаются из __SSR_CONFIG__ + __TRANSLATIONS__
 */

import React, { createContext, useContext, ReactNode } from 'react';
import type { AppConfig, SsrContext, VendorInfo, CurrencySettings, AccountingSettings } from '../types/context';

// Context с null по умолчанию (будет заполнен Provider'ом)
const ConfigContext = createContext<AppConfig | null>(null);

interface ConfigProviderProps {
  config: AppConfig;
  children: ReactNode;
}

/**
 * Provider для SSR конфигурации.
 * Оборачивает приложение и предоставляет config через context.
 *
 * @example
 * // В SSR сервере
 * <ConfigProvider config={fullAppConfig}>
 *   <App />
 * </ConfigProvider>
 */
export const ConfigProvider: React.FC<ConfigProviderProps> = ({ config, children }) => {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

/**
 * Дефолтные значения для конфигурации
 */
const DEFAULT_CONFIG: AppConfig = {
  vendor: {
    id: 0,
    root_url: '',
    public_api_url: '',
    operator_api_url: '',
  },
  locale: 'ru',
  translations: {},
  currency: {
    symbol: '₽',
    format: '%v %s',
    decimal: ',',
    thousand: ' ',
    precision: 0,
  },
  accountingSettings: {
    currency: { symbol: '₽', format: '%v %s' },
    number: { precision: 0, thousand: ' ', decimal: ',' },
  },
  assetHost: '',
  thumborUrl: '',
  maxItemsCount: 100,
  fallbackProductImage: '',
};

/**
 * Hook для получения полной конфигурации в компонентах.
 *
 * @example
 * function ProductImage({ src }) {
 *   const { thumborUrl, vendor } = useConfig();
 *   return <img src={`${thumborUrl}/unsafe/200x200/${src}`} />;
 * }
 */
export function useConfig(): AppConfig {
  const contextConfig = useContext(ConfigContext);

  if (contextConfig) {
    return contextConfig;
  }

  // На сервере context должен быть всегда установлен через Provider
  // Возвращаем дефолтные значения только как fallback
  return DEFAULT_CONFIG;
}

/**
 * Hook для получения информации о магазине
 */
export function useVendor(): VendorInfo {
  const config = useConfig();
  return config.vendor;
}

/**
 * Hook для получения текущей локали
 */
export function useLocale(): string {
  const config = useConfig();
  return config.locale;
}

/**
 * Hook для получения переводов
 */
export function useTranslations(): Record<string, unknown> {
  const config = useConfig();
  return config.translations;
}

/**
 * Hook для получения настроек валюты
 */
export function useCurrency(): CurrencySettings {
  const config = useConfig();
  return config.currency;
}

/**
 * Hook для получения настроек accounting
 */
export function useAccountingSettings(): AccountingSettings {
  const config = useConfig();
  return config.accountingSettings;
}

/**
 * HOC для class-based компонентов.
 * Инжектит config в props.
 *
 * @example
 * class MyComponent extends React.Component {
 *   render() {
 *     const { config } = this.props;
 *     return <img src={`//${config.assetHost}/logo.png`} />;
 *   }
 * }
 * export default withConfig(MyComponent);
 */
export function withConfig<P extends { config?: AppConfig }>(
  WrappedComponent: React.ComponentType<P>
): React.FC<Omit<P, 'config'>> {
  const WithConfigComponent: React.FC<Omit<P, 'config'>> = (props) => {
    const config = useConfig();
    return <WrappedComponent {...(props as P)} config={config} />;
  };

  WithConfigComponent.displayName = `withConfig(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithConfigComponent;
}

export { ConfigContext };
export type { AppConfig, SsrContext };
