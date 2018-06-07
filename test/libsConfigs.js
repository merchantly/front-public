import i18n from 'i18next';
import translations from './mocks/translations';
import React, { Component } from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

Component.defaultProps = {
  hello: 'ok',
  t: () => {}
};

const LOCALE = 'ru';

i18n.init({
  fallbackLng: 'ru',
  interpolationPrefix: '%{',
  interpolationSuffix: '}',
  lng: LOCALE,
  resStore: {
    [LOCALE]: {
      translation: translations,
    },
  },
});

// i18n.setLng(LOCALE);
