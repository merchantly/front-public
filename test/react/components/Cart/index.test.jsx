/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import t from 'test/mocks/t';
import emptyCart from 'test/fixtures/cart/empty';
import weightOfPriceCart from 'test/fixtures/cart/weight-of-price';
import selectPackageCart from 'test/fixtures/cart/select-package.json';
import CartContainer from 'rc/Cart';
import { humanizedMoney } from 'r/helpers/money';

describe('[Component] CartContainer', () => {
  it('should render empty message when the cart is empty', () => {
    const props = { ...emptyCart, t, isTesting: true };

    expect(render(<CartContainer {...props} />)
      .find('.b-cart__content .b-text p')
      .text()
    ).to.equal('vendor.cart.empty');
  });

  it('should consider `good.weight_of_price` for weighted goods', () => {
    const props = { ...weightOfPriceCart, t, isTesting: true };
    const [ item ] = weightOfPriceCart.initialCart.items;
    const itemSum = item.weight / item.good.weight_of_price * item.good.actual_price.cents;
    const itemPrice = Object.assign({}, item.good.actual_price, { cents: itemSum });

    expect(render(<CartContainer {...props} />)
      .find('.b-cart__item__price > span > span').eq(0)
      .text()
    ).to.equal(humanizedMoney(itemPrice));
  });

  it('should show error and disable submit button when minimal price present and is larger than cart sum', () => {
    const props = { ...selectPackageCart, isTesting: true };

    expect(render(<CartContainer {...props} />)
      .find('input.b-cart__action__submit')
      .attr('disabled')
    ).to.exist;

    expect(render(<CartContainer {...props} />)
      .find('.help-block #cart-error-minimal-price')
    ).to.have.length(1);
  });

  it('should not disable submit button when there is no any minimal price', () => {
    const props = { ...selectPackageCart, isTesting: true, minimalPrice: null };

    expect(render(<CartContainer {...props} />)
      .find('input.b-cart__action__submit')
      .attr('disabled')
    ).not.to.exist;
  });

  it('should not display server generated minimal price error', () => {
    const props = { ...selectPackageCart, isTesting: true };

    expect (render(<CartContainer {...props} />)
      .find('.help-block [id^=cart-error-]')
    ).to.have.length(2);
  });
});
