/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import CategoriesShowPage from 'rc/CategoriesShow/CategoriesShowPage';
import props from 'test/fixtures/categoriesShow/page-sample.json';

describe('[Component] CategoriesShowPage', () => {
  it('should render without errors', () => {
    expect(() => render(<CategoriesShowPage {...props} />)).not.to.throw();
  });
});
