/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import OrderPaymentPage from 'rc/OrderPayment/OrderPaymentPage';
import props from 'test/fixtures/orderPayment/page-sample.json';

describe('[Component] OrderPaymentPage', () => {
  it('should render without errors', () => {
    expect(() => render(<OrderPaymentPage {...props} />)).not.to.throw();
  });
});
