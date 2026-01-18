// Migrate to webpack's externals - https://webpack.js.org/configuration/externals/
//
window.I18n = require('i18next'); // Fallback for rails I18n
window.$ = window.jQuery = require('jquery');
window.React = require('react');
window.ReactDOM = require('react-dom');
window.EventEmitter = require('eventemitter3');
window.accounting = require('accounting');

// jQuery plugins
require('jquery.mmenu/src/js/jquery.mmenu.min.all');
require('sticky-kit/dist/sticky-kit');

// Others
require('OwlCarousel/owl-carousel/owl.carousel');
require('fancybox')($);

require('nouislider');

require('morecontent-js/dist/jquery.morecontent.js');

require('bootstrap-tooltip');

const DEFAULT_SETTINGS = {
  currency: {
    symbol: 'руб.', // default currency symbol is '$'
    format: '%v %s', // controls output: %s = symbol, %v = value/number (can be object: see below)
    decimal: ',', // decimal point separator
    thousand: ' ', // thousands separator
    precision: 0, // decimal places
  },
  number: {
    precision: 0, // default precision on numbers is 0
    thousand: '',
    decimal: ',',
  },
};

/**
 * Получить настройки accounting из доступных источников
 *
 * Порядок приоритета:
 * 1. __SSR_CONFIG__.accountingSettings (новый формат)
 * 2. gon.accounting_settings (legacy)
 * 3. DEFAULT_SETTINGS
 */
function getAccountingSettings() {
  // Новый формат: __SSR_CONFIG__
  if (typeof document !== 'undefined') {
    const configScript = document.getElementById('__SSR_CONFIG__');
    if (configScript) {
      try {
        const config = JSON.parse(configScript.textContent || '{}');
        if (config.accountingSettings) {
          return config.accountingSettings;
        }
      } catch (e) {
        // Игнорируем ошибки парсинга
      }
    }
  }

  // Legacy: gon.accounting_settings
  if (typeof gon !== 'undefined' && gon.accounting_settings) {
    return gon.accounting_settings;
  }

  return DEFAULT_SETTINGS;
}

window.accounting.settings = getAccountingSettings();
