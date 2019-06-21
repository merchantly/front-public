/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import t from '../../../mocks/t';
import OrderContainer from '../../../../app/scripts/react/components/Order';
import orderWithCoupon from '../../../fixtures/order/with-coupon';

describe('[Component] OrderContainer', () => {
  it('should render valid component with correct props', () => {
    const props = { ...orderWithCoupon, t };

    expect(() => render(<OrderContainer {...props} />)).to.not.throw();
  });

  it('should render coupon field when coupon visibility set to true', () => {
    const props = { ...orderWithCoupon, t };

    expect(render(<OrderContainer {...props} />)
      .find('input#vendor_order_coupon_code')
      .length
    ).to.equal(1);
  });
});
