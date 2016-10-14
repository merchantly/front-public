/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import CartPage from 'rc/Cart/CartPage';
import props from 'test/fixtures/cart/page-with-package.json';

describe('[Component] CartPage', () => {
  it('should render without errors', () => {
    expect(() => render(<CartPage {...props} />)).not.to.throw();
  });
});
