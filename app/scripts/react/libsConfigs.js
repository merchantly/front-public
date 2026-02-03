import i18next from 'i18next';
import ErrorService from './services/Error';

const DEFAULT_LOCALE = 'ru';

/**
 * Получить gon объект SSR-safe способом
 */
function getGon() {
  if (typeof window !== 'undefined' && window.gon) {
    return window.gon;
  }
  if (typeof global !== 'undefined' && global.gon) {
    return global.gon;
  }
  return null;
}

let locale = DEFAULT_LOCALE;
let translations = {};

// i18n - SSR-safe инициализация
const gon = getGon();
if (gon && gon.i18n) {
  locale = gon.i18n.locale || DEFAULT_LOCALE;
  translations = gon.i18n.translations || {};
}

i18next.init({
  fallbackLng: DEFAULT_LOCALE,
  interpolationPrefix: '%{',
  interpolationSuffix: '}',
  lng: locale || DEFAULT_LOCALE,
  resStore: {
    [locale || DEFAULT_LOCALE]: {
      translation: translations,
    },
  },
});

// i18n.setLng(locale);

// Console
// Rewrite original console.warn for detecting React's propTypes warnings
const originalWarning = console.warn;

console.warn = (warning, ...rest) => {
  if (warning && warning.indexOf('Failed propType') > -1) {
    ErrorService.notifyWarning(warning);
  }

  originalWarning.apply(console, [warning, ...rest]);
};
