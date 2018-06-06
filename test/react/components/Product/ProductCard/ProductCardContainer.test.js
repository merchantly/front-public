import React from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';
import { expect } from 'chai';

import t from '../../../../mocks/t';

import { ProductCardContainer } from '../../../../../app/scripts/react/components/Product/ProductCard';

describe('[Component] ProductCardContainer', () => {
  it('should render without properties', () => {
    const props = { t };
    const component = renderIntoDocument(
      <ProductCardContainer {...props} />
    );

    expect(component).to.be.an('object');
  });
});