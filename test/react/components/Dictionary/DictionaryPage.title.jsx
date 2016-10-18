/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import DictionaryPage from 'rc/Dictionary/DictionaryPage';
import { layoutProps } from 'test/fixtures/vendorLayout/sample.json';

describe('[Component] DictionaryPage', () => {
  it('should render without errors', () => {
    expect(() => render(
      <DictionaryPage
        layoutProps={layoutProps}
        title="title"
      />
    )).not.to.throw();
  });
});
