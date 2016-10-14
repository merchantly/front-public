/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import ProductSearchPage from 'rc/ProductSearch/ProductSearchPage';
import props from 'test/fixtures/productSearch/page-sample.json';

describe('[Component] ProductSearchPage', () => {
  it('should render without errors', () => {
    expect(() => render(<ProductSearchPage {...props} />)).not.to.throw();
  });
});
