/**
 * ConfigContext - React Context для конфигурации приложения
 *
 * Предоставляет доступ к конфигурации:
 * - vendor: информация о магазине (id, URLs, design)
 * - locale: язык интерфейса
 * - translations: переводы строк
 * - currency: настройки валюты (symbol, format, decimal, thousand, precision)
 * - numberSettings: настройки форматирования чисел
 * - assetHost, thumborUrl, maxItemsCount, fallbackProductImage: серверные настройки
 *
 * Источники данных (по приоритету):
 * 1. ConfigContext (SSR или клиент с Provider)
 * 2. __SSR_CONFIG__ + __TRANSLATIONS__ (новый формат)
 * 3. gon.* (legacy fallback на клиенте)
 * 4. Дефолтные значения
 */

import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

// Context с null по умолчанию
const ConfigContext = createContext(null);

/**
 * ConfigProvider - обёртка для передачи конфигурации через context
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
    vendor: PropTypes.shape({
      id: PropTypes.number,
      root_url: PropTypes.string,
      public_api_url: PropTypes.string,
      operator_api_url: PropTypes.string,
      design: PropTypes.object,
    }),
    locale: PropTypes.string,
    translations: PropTypes.object,
    currency: PropTypes.shape({
      symbol: PropTypes.string,
      format: PropTypes.string,
      decimal: PropTypes.string,
      thousand: PropTypes.string,
      precision: PropTypes.number,
    }),
    numberSettings: PropTypes.shape({
      precision: PropTypes.number,
      thousand: PropTypes.string,
      decimal: PropTypes.string,
    }),
    assetHost: PropTypes.string,
    thumborUrl: PropTypes.string,
    maxItemsCount: PropTypes.number,
    fallbackProductImage: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

/**
 * Дефолтные значения конфигурации
 */
const DEFAULT_CONFIG = {
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
  numberSettings: {
    precision: 0,
    thousand: ' ',
    decimal: ',',
  },
  assetHost: '',
  thumborUrl: '',
  maxItemsCount: 100,
  fallbackProductImage: '',
};

/**
 * Получить конфигурацию из __SSR_CONFIG__ + __TRANSLATIONS__ (новый формат)
 */
function getSsrConfig() {
  if (typeof window === 'undefined') {
    return null;
  }

  // Читаем config из JSON script тега
  const configScript = document.getElementById('__SSR_CONFIG__');
  if (!configScript) {
    return null;
  }

  try {
    const config = JSON.parse(configScript.textContent || '{}');

    // Валидация критических полей
    if (!config.vendor || !config.locale) {
      console.error('[ConfigContext] __SSR_CONFIG__ is missing required fields (vendor or locale)');
      return null;
    }

    // Добавляем translations из глобальной переменной
    const translations = window.__TRANSLATIONS__ || {};

    return {
      ...config,
      translations,
    };
  } catch (e) {
    console.error('[ConfigContext] Failed to parse __SSR_CONFIG__:', e.message);
    return null;
  }
}

/**
 * Извлечь currency и numberSettings из gon.accounting_settings
 */
function extractFromAccountingSettings(accountingSettings) {
  const settings = accountingSettings || {};
  const currencySettings = settings.currency || {};
  const numberSettings = settings.number || {};

  return {
    currency: {
      symbol: currencySettings.symbol || '₽',
      format: currencySettings.format || '%v %s',
      decimal: currencySettings.decimal || ',',
      thousand: currencySettings.thousand || ' ',
      precision: typeof currencySettings.precision === 'number' ? currencySettings.precision : 0,
    },
    numberSettings: {
      precision: typeof numberSettings.precision === 'number' ? numberSettings.precision : 0,
      thousand: numberSettings.thousand || ' ',
      decimal: numberSettings.decimal || ',',
    },
  };
}

/**
 * Получить конфигурацию из gon (для legacy fallback в браузере)
 */
function getGonConfig() {
  if (typeof window !== 'undefined' && window.gon) {
    const gon = window.gon;
    const gonData = gon.__data || {};
    const gonI18n = gon.i18n || {};
    const { currency, numberSettings } = extractFromAccountingSettings(gon.accounting_settings);

    return {
      vendor: {
        id: 0,
        root_url: '',
        public_api_url: gon.public_api_url || '',
        operator_api_url: gon.operator_api_url || '',
        design: gonData.design || {},
      },
      locale: gonI18n.locale || 'ru',
      translations: gonI18n.translations || {},
      currency,
      numberSettings,
      assetHost: gon.asset_host || '',
      thumborUrl: gon.thumbor_url || '',
      maxItemsCount: gon.max_items_count || 100,
      fallbackProductImage: '',
    };
  }

  // Проверяем global.gon (для Node.js/SSR с polyfills)
  if (typeof global !== 'undefined' && global.gon) {
    const gon = global.gon;
    const gonData = gon.__data || {};
    const gonI18n = gon.i18n || {};
    const { currency, numberSettings } = extractFromAccountingSettings(gon.accounting_settings);

    return {
      vendor: {
        id: 0,
        root_url: '',
        public_api_url: gon.public_api_url || '',
        operator_api_url: gon.operator_api_url || '',
        design: gonData.design || {},
      },
      locale: gonI18n.locale || 'ru',
      translations: gonI18n.translations || {},
      currency,
      numberSettings,
      assetHost: gon.asset_host || '',
      thumborUrl: gon.thumbor_url || '',
      maxItemsCount: gon.max_items_count || 100,
      fallbackProductImage: '',
    };
  }

  return null;
}

/**
 * useConfig - хук для получения полной конфигурации
 *
 * @returns {Object} Полная конфигурация приложения
 */
export function useConfig() {
  const contextConfig = useContext(ConfigContext);

  // 1. Если есть context - используем его (SSR или клиент с Provider)
  if (contextConfig) {
    return contextConfig;
  }

  // 2. Пробуем новый формат __SSR_CONFIG__ + __TRANSLATIONS__
  const ssrConfig = getSsrConfig();
  if (ssrConfig) {
    return ssrConfig;
  }

  // 3. Fallback на gon для браузера (обратная совместимость)
  const gonConfig = getGonConfig();
  if (gonConfig) {
    console.warn('[ConfigContext] Using legacy gon fallback');
    return gonConfig;
  }

  // 4. Дефолтные значения
  console.error('[ConfigContext] No configuration source available, using DEFAULT_CONFIG');
  return DEFAULT_CONFIG;
}

/**
 * useVendor - хук для получения информации о магазине
 */
export function useVendor() {
  const config = useConfig();
  return config.vendor;
}

/**
 * useLocale - хук для получения текущей локали
 */
export function useLocale() {
  const config = useConfig();
  return config.locale;
}

/**
 * useTranslations - хук для получения переводов
 */
export function useTranslations() {
  const config = useConfig();
  return config.translations;
}

/**
 * useCurrency - хук для получения настроек валюты
 */
export function useCurrency() {
  const config = useConfig();
  return config.currency;
}

/**
 * useNumberSettings - хук для получения настроек форматирования чисел
 */
export function useNumberSettings() {
  const config = useConfig();
  return config.numberSettings;
}

/**
 * useAccountingSettings - хук для получения настроек accounting.js
 * Формирует объект из currency + numberSettings
 */
export function useAccountingSettings() {
  const config = useConfig();
  return {
    currency: config.currency,
    number: config.numberSettings,
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
          // Используем context или fallback
          const config = contextConfig || getSsrConfig() || getGonConfig() || DEFAULT_CONFIG;
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
