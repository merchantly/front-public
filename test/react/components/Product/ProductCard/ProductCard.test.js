import React from 'react';
import { scryRenderedComponentsWithType, renderIntoDocument } from 'react-dom/test-utils';
import { expect } from 'chai';

import p3912 from '../../../../fixtures/products/3912';
import p3917 from '../../../../fixtures/products/3917';
import p4273 from '../../../../fixtures/products/4273';
import p20611 from '../../../../fixtures/products/20611';
import p22983 from '../../../../fixtures/products/22983';
import p33427 from '../../../../fixtures/products/33427';
import p33548 from '../../../../fixtures/products/33548';
import p35026 from '../../../../fixtures/products/35026';
import p35671 from '../../../../fixtures/products/35671';
import p35890 from '../../../../fixtures/products/35890';

import t from '../../../../mocks/t';

import { ProductCard } from '../../../../../app/scripts/react/components/Product/ProductCard';

function fixtureRenderer(fixture) {
  it('should render product with id ' + fixture.product.id, () => {
    const props = {
      ...fixture,
      t,
    };
    const fn = () => {
      renderIntoDocument(
        <ProductCard {...props} />
      );
    };

    expect(fn).to.not.throw();
  });
}

describe('[Component] ProductCard', () => {
  it('should render when product is empty object', () => {
    const props = {
      product: {},
      t,
    };
    const fn = () => {
      renderIntoDocument(
        <ProductCard {...props} />
      );
    };

    expect(fn).to.not.throw();
  });

  fixtureRenderer(p3912);
  fixtureRenderer(p3917);
  fixtureRenderer(p4273);
  fixtureRenderer(p20611);
  fixtureRenderer(p22983);
  fixtureRenderer(p33427);
  fixtureRenderer(p33548);
  fixtureRenderer(p35026);
  fixtureRenderer(p35671);
  fixtureRenderer(p35890);
});