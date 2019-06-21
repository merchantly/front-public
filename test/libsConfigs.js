import i18next from 'i18next';
import translations from './mocks/translations';
import React, { Component } from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.2';

Enzyme.configure({ adapter: new Adapter() });

Component.defaultProps = {
  hello: 'ok',
  t: () => {}
};

const LOCALE = 'ru';

i18next.init({
  fallbackLng: LOCALE,
  interpolationPrefix: '%{',
  interpolationSuffix: '}',
  lng: LOCALE,
  resStore: {
    [LOCALE]: {
      translation: translations,
    },
  },
});

// i18next.setLng(LOCALE);
