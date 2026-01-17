import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import localeLanguages from '../../constants/localeLanguages';

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

const provideTranslations = (WrappedComponent) => {
  class I18nextProvider extends Component {
    componentWillMount() {
      const locale = this.getLocale();
      const translations = this.getTranslations();

      this.i18n = i18next.createInstance({
        lng: locale,
        fallbackLng: 'ru',
        interpolation: {
          prefix: '%{',
          suffix: '}',
        },
        resources: {
          [locale]: {
            translation: translations,
          },
        },
      }, () => {});
    }
    getLocale() {
      const { i18n } = this.props;

      if (i18n && i18n.locale) {
        return i18n.locale;
      }

      const gon = getGon();
      if (gon && gon.i18n && gon.i18n.locale) {
        return gon.i18n.locale;
      }

      return 'ru';
    }
    getTranslations() {
      const { i18n } = this.props;

      if (i18n && i18n.translations) {
        return i18n.translations;
      }

      const gon = getGon();
      if (gon && gon.i18n && gon.i18n.translations) {
        return gon.i18n.translations;
      }

      return {};
    }
    render() {
      return (
        <WrappedComponent t={this.i18n.getFixedT()} {...this.props} />
      );
    }
  }

  I18nextProvider.wrapped = WrappedComponent;

  I18nextProvider.propTypes = {
    i18n: PropTypes.shape({
      locale: PropTypes.oneOf(localeLanguages).isRequired,
      translations: PropTypes.object.isRequired,
    }),
  };

  return I18nextProvider;
};

export default provideTranslations;
