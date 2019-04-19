import i18next from 'i18next';
import ErrorService from './services/Error';

// i18next
if (gon) {
  const { i18next: {locale = 'ru', translations = {}} } = gon;
  console.log("initialize i18next from gon");

  i18next.init({
    fallbackLng: 'ru',
    interpolationPrefix: '%{',
    interpolationSuffix: '}',
    lng: locale,
    resStore: {
      [locale]: {
        translation: translations,
      },
    },
  });

  // i18next.setLng(locale);
}

// Console
// Rewrite original console.warn for detecting React's propTypes warnings
const originalWarning = console.warn;

console.warn = (warning, ...rest) => {
  if (warning && warning.indexOf('Failed propType') > -1) {
    ErrorService.notifyWarning(warning);
  }

  originalWarning.apply(console, [warning, ...rest]);
}
