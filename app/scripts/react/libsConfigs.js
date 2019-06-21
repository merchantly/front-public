import i18next from 'i18next';
import ErrorService from './services/Error';

const DEFAULT_LOCALE = 'ru';

let locale = undefined;
let translations = {};

// i18n
if (typeof gon !== 'undefined') {
  locale = gon.i18n.locale || DEFAULT_LOCALE;
  translations = gon.i18n.translations || {};
};

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
}
