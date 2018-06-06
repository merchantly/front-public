import React from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';
import { expect } from 'chai';
import Logo from '../../../../app/scripts/react/components/Logo';

describe('[Component] Logo', function() {
  it('renders without errors', function() {
    const renderedComponent = renderIntoDocument(
      <Logo
        logoUrl="http://assets.kiiiosk.ru/uploads/vendor/logo/5/logo.svg"
        linkUrl="http://google.ru"
        logoText="Test"
        imageAlt="Test2"
      />
    );

    expect(renderedComponent).to.be.an('object');
  });
});