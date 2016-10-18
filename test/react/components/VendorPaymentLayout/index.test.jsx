/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import VendorPaymentLayoutContainer from 'rc/VendorPaymentLayout';
import { layoutProps as props } from 'test/fixtures/vendorPaymentLayout/sample.json';

describe('[Component] VendorPaymentLayoutContainer', () => {
  it('should render without errors', () => {
    expect(() => render(
      <VendorPaymentLayoutContainer {...props}>
        <div />
      </VendorPaymentLayoutContainer>
    )).not.to.throw();
  });
});
