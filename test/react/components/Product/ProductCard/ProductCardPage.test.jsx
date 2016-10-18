/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import ProductCardPage from 'rc/Product/ProductCard/ProductCardPage';
import props from 'test/fixtures/products/page-sample.json';

describe('[Component] ProductCardPage', () => {
  it('should render without errors', () => {
    expect(() => render(<ProductCardPage {...props} />)).not.to.throw();
  });
});
