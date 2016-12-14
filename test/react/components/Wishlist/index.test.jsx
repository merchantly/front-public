/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import synteticData from '../../../fixtures/wishlist/synteticData';
import t from '../../../mocks/t';

import WishlistContainer from '../../../../app/scripts/react/components/Wishlist';

describe('[Component] WishlistContainer', () => {
  it('should render without errors when there aren\'t any props', () => {
    const props = { t };

    expect(render(<WishlistContainer {...props} />)).to.be.an('object');
  });

  it('should render properly when right props provided', () => {
    const props = {
      ...synteticData,
      t,
    };

    expect(render(<WishlistContainer {...props} />)).to.be.an('object');
  });

  it('should have `already` button for goods already in the cart', () => {
    const props = {
      ...synteticData,
      t,
    };

    expect(render(<WishlistContainer {...props} />)
      .find('li.b-cart__item .b-add-cart-button-text')
      .eq(0)
      .text()
    ).to.equal('vendor.button.already');
  });

  it('should have `add to cart` button when good is not in the cart', () => {
    const props = { ...synteticData, t };

    expect(render(<WishlistContainer {...props} />)
      .find('li.b-cart__item .b-add-cart-button')
      .eq(1)
      .find('a')
      .attr('href')
    ).to.equal(props.wishlistItems[1].good.addToCartUrl);
  });
});
