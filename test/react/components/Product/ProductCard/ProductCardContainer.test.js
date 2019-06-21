import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';

import t from '../../../../mocks/t';

import { ProductCardContainer } from '../../../../../app/scripts/react/components/Product/ProductCard';

describe('[Component] ProductCardContainer', () => {
  it('should render without properties', () => {
    const props = { t };

    expect( () => render(
      <ProductCardContainer {...props} />
      )
    ).to.not.throw();
  });
});
