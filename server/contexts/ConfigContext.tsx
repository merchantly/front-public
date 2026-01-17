/**
 * ConfigContext - React Context для SSR конфигурации
 *
 * Предоставляет доступ к конфигурации (asset_host, thumbor_url, max_items_count)
 * которая ранее бралась из глобального объекта gon.
 *
 * На сервере: значения приходят из ENV через ConfigProvider
 * На клиенте: fallback на gon.* если context не доступен
 */

import React, { createContext, useContext, ReactNode } from 'react';
import type { AppConfig } from '../config';

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
 * <ConfigProvider config={getConfigForContext()}>
 *   <App />
 * </ConfigProvider>
 */
export const ConfigProvider: React.FC<ConfigProviderProps> = ({ config, children }) => {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

/**
 * Получить gon объект на клиенте (fallback).
 * Возвращает null на сервере или если gon не определён.
 */
function getGonConfig(): AppConfig | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const gon = (window as any).gon;
  if (!gon) {
    return null;
  }

  return {
    assetHost: gon.asset_host || '',
    thumborUrl: gon.thumbor_url || '',
    maxItemsCount: gon.max_items_count || 100,
  };
}

/**
 * Hook для получения конфигурации в компонентах.
 *
 * Приоритет:
 * 1. ConfigContext (SSR или если Provider установлен)
 * 2. gon.* (legacy fallback на клиенте)
 * 3. Дефолтные значения
 *
 * @example
 * function AssetImage({ src }) {
 *   const { assetHost } = useConfig();
 *   return <img src={assetHost ? `//${assetHost}/${src}` : `/${src}`} />;
 * }
 */
export function useConfig(): AppConfig {
  const contextConfig = useContext(ConfigContext);

  // Если есть context — используем его (SSR или обёрнуто в Provider)
  if (contextConfig) {
    return contextConfig;
  }

  // Fallback на gon для клиента (legacy поддержка)
  const gonConfig = getGonConfig();
  if (gonConfig) {
    return gonConfig;
  }

  // Дефолтные значения если ничего не доступно
  return {
    assetHost: '',
    thumborUrl: '',
    maxItemsCount: 100,
  };
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
export type { AppConfig };
