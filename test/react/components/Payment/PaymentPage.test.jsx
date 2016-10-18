/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import {
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
} from 'rc/Payment';
import PaymentPage from 'rc/Payment/PaymentPage';
import { layoutProps } from 'test/fixtures/vendorLayout/sample.json';

describe('[Component] PaymentPage', () => {
  it('should render without errors', () => {
    expect(() => render(
      <PaymentPage
        layoutProps={layoutProps}
        state={PAYMENT_SUCCESS}
        vendorUrl="/v"
      />
    )).not.to.throw();

    expect(() => render(
      <PaymentPage
        layoutProps={layoutProps}
        state={PAYMENT_FAILURE}
        vendorUrl="/v"
      />
    )).not.to.throw();
  });
});
