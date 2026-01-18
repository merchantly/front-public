/**
 * ConfigContext - React Context для SSR конфигурации
 *
 * Предоставляет доступ к конфигурации приложения:
 * - vendor: API URLs магазина
 * - locale: язык интерфейса
 * - currency + numberSettings: настройки для accounting.js
 * - design: настройки дизайна (logoUrl)
 * - assetHost, thumborUrl, maxItemsCount: серверные настройки
 *
 * На сервере: значения приходят из SsrContext + ENV через ConfigProvider
 * На клиенте: значения загружаются из __SSR_CONFIG__
 */

import React, { createContext, useContext, ReactNode } from 'react';
import type { AppConfig, SsrContext, VendorInfo, CurrencySettings, NumberSettings, AccountingSettings, DesignSettings } from '../types/context';

// Context с null по умолчанию (будет заполнен Provider'ом)
const ConfigContext = createContext<AppConfig | null>(null);

interface ConfigProviderProps {
  config: AppConfig;
  children: ReactNode;
}

/**
 * Provider для SSR конфигурации.
 * Оборачивает приложение и предоставляет config через context.
 */
export const ConfigProvider: React.FC<ConfigProviderProps> = ({ config, children }) => {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

/**
 * Дефолтные значения для конфигурации
 */
const DEFAULT_CONFIG: AppConfig = {
  vendor: {
    public_api_url: '',
    operator_api_url: '',
  },
  locale: 'ru',
  currency: {
    symbol: '₽',
    format: '%v %s',
    decimal: ',',
    thousand: ' ',
    precision: 0,
  },
  numberSettings: {
    precision: 0,
    thousand: ' ',
    decimal: ',',
  },
  design: undefined,
  assetHost: '',
  thumborUrl: '',
  maxItemsCount: 100,
};

/**
 * Hook для получения полной конфигурации
 */
export function useConfig(): AppConfig {
  const contextConfig = useContext(ConfigContext);

  if (contextConfig) {
    return contextConfig;
  }

  return DEFAULT_CONFIG;
}

/**
 * Hook для получения информации о магазине (API URLs)
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
 * Hook для получения настроек валюты
 */
export function useCurrency(): CurrencySettings {
  const config = useConfig();
  return config.currency;
}

/**
 * Hook для получения настроек форматирования чисел
 */
export function useNumberSettings(): NumberSettings {
  const config = useConfig();
  return config.numberSettings;
}

/**
 * Hook для получения настроек дизайна
 */
export function useDesign(): DesignSettings | undefined {
  const config = useConfig();
  return config.design;
}

/**
 * Hook для получения настроек accounting.js
 */
export function useAccountingSettings(): AccountingSettings {
  const config = useConfig();
  return {
    currency: config.currency,
    number: config.numberSettings,
  };
}

/**
 * HOC для class-based компонентов.
 * Инжектит config в props.
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
