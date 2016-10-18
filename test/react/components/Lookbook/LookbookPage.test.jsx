/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import LookbookPage from 'rc/Lookbook/LookbookPage';
import { layoutProps } from 'test/fixtures/vendorLayout/sample.json';
import props from 'test/fixtures/lookbook/sample.json';

describe('[Component] LookbookPage', () => {
  it('should render without errors', () => {
    expect(() => render(
      <LookbookPage {...props} layoutProps={layoutProps} />
    )).not.to.throw();
  });
});
