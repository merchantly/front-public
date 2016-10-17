/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import OrderPage from 'rc/Order/OrderPage';
import props from 'test/fixtures/order/page-with-coupon.json';

describe('[Component] OrderPage', () => {
  it('should render without errors', () => {
    expect(() => render(<OrderPage {...props} />)).not.to.throw();
  });
});
