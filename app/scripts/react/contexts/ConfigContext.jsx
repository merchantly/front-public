/**
 * ConfigContext - React Context для конфигурации приложения
 *
 * Предоставляет доступ к конфигурации (assetHost, thumborUrl, maxItemsCount)
 * которая ранее бралась из глобального объекта gon.
 *
 * Использование:
 *   import { useConfig } from 'r/contexts/ConfigContext';
 *   const { assetHost, thumborUrl, maxItemsCount } = useConfig();
 *
 * На сервере: значения приходят из ENV через ConfigProvider
 * На клиенте: fallback на gon.* если context не доступен
 */

import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

// Context с null по умолчанию
const ConfigContext = createContext(null);

/**
 * ConfigProvider - обёртка для передачи конфигурации через context
 *
 * @param {Object} props
 * @param {Object} props.config - Объект конфигурации
 * @param {string} props.config.assetHost - URL хоста для ассетов
 * @param {string} props.config.thumborUrl - URL Thumbor сервера
 * @param {number} props.config.maxItemsCount - Максимальное количество товаров
 * @param {React.ReactNode} props.children
 */
export function ConfigProvider({ config, children }) {
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}

ConfigProvider.propTypes = {
  config: PropTypes.shape({
    assetHost: PropTypes.string,
    thumborUrl: PropTypes.string,
    maxItemsCount: PropTypes.number,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

/**
 * Получить конфигурацию из gon (для fallback в браузере)
 */
function getGonConfig() {
  if (typeof window !== 'undefined' && window.gon) {
    return {
      assetHost: window.gon.asset_host || '',
      thumborUrl: window.gon.thumbor_url || '',
      maxItemsCount: window.gon.max_items_count || 100,
    };
  }
  // Проверяем global.gon (для Node.js/SSR с polyfills)
  if (typeof global !== 'undefined' && global.gon) {
    return {
      assetHost: global.gon.asset_host || '',
      thumborUrl: global.gon.thumbor_url || '',
      maxItemsCount: global.gon.max_items_count || 100,
    };
  }
  return null;
}

/**
 * useConfig - хук для получения конфигурации
 *
 * Возвращает объект с полями:
 * - assetHost: string
 * - thumborUrl: string
 * - maxItemsCount: number
 *
 * @returns {Object} Конфигурация приложения
 */
export function useConfig() {
  const contextConfig = useContext(ConfigContext);

  // Если есть context - используем его (SSR или клиент с Provider)
  if (contextConfig) {
    return contextConfig;
  }

  // Fallback на gon для браузера (обратная совместимость)
  const gonConfig = getGonConfig();
  if (gonConfig) {
    return gonConfig;
  }

  // Значения по умолчанию если ничего не доступно
  return {
    assetHost: '',
    thumborUrl: '',
    maxItemsCount: 100,
  };
}

/**
 * withConfig - HOC для классовых компонентов
 *
 * Использование:
 *   class MyComponent extends React.Component {
 *     render() {
 *       const { assetHost } = this.props.config;
 *       return <div>{assetHost}</div>;
 *     }
 *   }
 *   export default withConfig(MyComponent);
 *
 * @param {React.Component} WrappedComponent
 * @returns {React.Component}
 */
export function withConfig(WrappedComponent) {
  // Используем Consumer паттерн вместо hooks чтобы избежать
  // проблем с несколькими копиями React в бандле
  function WithConfigWrapper(props) {
    return (
      <ConfigContext.Consumer>
        {(contextConfig) => {
          // Используем context или fallback на gon
          const config = contextConfig || getGonConfig() || {
            assetHost: '',
            thumborUrl: '',
            maxItemsCount: 100,
          };
          return <WrappedComponent {...props} config={config} />;
        }}
      </ConfigContext.Consumer>
    );
  }

  WithConfigWrapper.displayName = `withConfig(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithConfigWrapper;
}

export { ConfigContext };
export default ConfigContext;
