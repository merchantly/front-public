/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import Payment, {
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
} from 'rc/Payment';

describe('[Component] Payment', () => {
  it('should render basic component without errors', () => {
    expect(() => render(
      <Payment state={PAYMENT_SUCCESS} vendorUrl={'/vendors/1'}/>
    )).to.not.throw();

    expect(() => render(
      <Payment state={PAYMENT_FAILURE} vendorUrl={'/vendors/1'}/>
    )).to.not.throw();
  });
});
