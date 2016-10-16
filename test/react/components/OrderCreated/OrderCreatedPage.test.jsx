/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import OrderCreatedPage from 'rc/OrderCreated/OrderCreatedPage';
import props from 'test/fixtures/orderCreated/page-sample.json';

describe('[Component] OrderCreatedPage', () => {
  it('should render without errors', () => {
    expect(() => render(<OrderCreatedPage {...props} />)).not.to.throw();
  });
});
