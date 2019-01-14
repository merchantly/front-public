import React from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';
import sinon from 'sinon';
import { expect } from 'chai';
import DesignSettings from '../../../../app/scripts/react/components/DesignSettings';

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
  it('should render without errors', () => {
    const design = {
      current: current,
      currentSaved: current,
      unsavedFields: {},
      isSaving: false,
    };
    const callbacks = {
      changeImage: sinon.spy(),
      changeOption: sinon.spy(),
      saveChanges: sinon.spy(),
      closeDesignSettingsPopup: sinon.spy(),
      onItemClick: sinon.spy(),
    };

    const renderedComponent = renderIntoDocument(
      <DesignSettings
        {...design}
        {...callbacks}
        authUrl="http://google.ru"
        categoryPageUrl="http://wanna-be.ru/categories/635-braslety"
        pageType="welcome"
        productPageUrl="http://wanna-be.ru/products/33302-kulon-merkaba-s-tsirkonami-serebryanyy-r"
      />
    );

    console.log(renderedComponent);

    expect(renderedComponent).to.be.an('object');
  });
});
