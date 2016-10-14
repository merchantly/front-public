/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import CategoriesShowChildrenPage from 'rc/CategoriesShowChildren/CategoriesShowChildrenPage';
import props from 'test/fixtures/categoriesShowChildren/page-sample.json';

describe('[Component] CategoriesShowChildrenPage', () => {
  it('should render without errors', () => {
    expect(() => render(<CategoriesShowChildrenPage {...props} />)).not.to.throw();
  });
});
