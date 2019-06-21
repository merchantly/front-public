import React from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';
import sinon from 'sinon';
import { expect } from 'chai';
import DesignSettings from '../../../../app/scripts/react/components/DesignSettings';
import t from 'test/mocks/t';

const current = {
  activeElementsColor: '#000000',
  mainPageProductsInRow: 2,
  mainPageRows: 5,
  mainPageInstagram: true,
  mainPageSlider: false,
  mainPageBanner: true,
  mainPageFilter: true,
  categoryPageProductsInRow: 2,
  categoryPageRows: 5,
  categoryPageFilter: true,
  productPagePhoto: 'aside',
  showSimilarProducts: true,
  // productPageSimilarProducts: 'off',
  logoUrl: null,
  pageBgUrl: null,
  pageBgColor: '#6c7a89',
  feedBgColor: '#000000',
  feedTransparency: .7,
  fontColor: '#000000',
  fontFamily: 'helvetica',
  fontSize: 'md',
};

describe('[Component] DesignSettings', () => {

  // mocha-chrome hangs on this example
  it.skip('should render without errors', () => {
    const design = {
      current: current,
      currentSaved: current,
      unsavedFields: {},
      isSaving: false,
    };
    const spy = () => {};
    const callbacks = {
      changeImage: spy,
      changeOption: spy,
      saveChanges: spy,
      closeDesignSettingsPopup: spy,
      onItemClick: spy,
    };

    const renderedComponent = renderIntoDocument(
      <DesignSettings
        {...design}
        {...callbacks}
        authUrl="http://localhost"
        categoryPageUrl="http://localhost"
        pageType="welcome"
        productPageUrl="http://localhost"
        tr={t}
      />
    );

    console.log(renderedComponent);

    expect(renderedComponent).to.be.an('object');
  });
});
