/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import ProductArchivedPage from 'rc/ProductArchived/ProductArchivedPage';
import props from 'test/fixtures/productArchived/page-sample.json';

describe('[Component] ProductArchivedPage', () => {
  it('should render without errors', () => {
    expect(() => render(<ProductArchivedPage {...props} />)).not.to.throw();
  });
});
