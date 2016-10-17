/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import OrderPaidPage from 'rc/OrderPaid/OrderPaidPage';
import props from 'test/fixtures/orderPaid/page-sample.json';

describe('[Component] OrderPaidPage', () => {
  it('should render without errors', () => {
    expect(() => render(<OrderPaidPage {...props} />)).not.to.throw();
  });
});
