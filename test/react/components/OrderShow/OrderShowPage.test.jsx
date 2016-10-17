/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import OrderShowPage from 'rc/OrderShow/OrderShowPage';
import props from 'test/fixtures/orderShow/page-sample.json';

describe('[Component] OrderShowPage', () => {
  it('should render without errors', () => {
    expect(() => render(<OrderShowPage {...props} />)).not.to.throw();
  });
});
