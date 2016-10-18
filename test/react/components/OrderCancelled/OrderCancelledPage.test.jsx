/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import OrderCancelledPage from 'rc/OrderCancelled/OrderCancelledPage';
import props from 'test/fixtures/orderCancelled/page-sample.json';

describe('[Component] OrderCancelledPage', () => {
  it('should render without errors', () => {
    expect(() => render(<OrderCancelledPage {...props} />)).not.to.throw();
  });
});
