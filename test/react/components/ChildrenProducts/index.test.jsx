/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import childrenProductsPropsSample from 'test/fixtures/childrenProducts/sample';
import t from 'test/mocks/t';
import ChildrenProducts from 'rc/ChildrenProducts';

describe('[Component] ChildrenProducts', () => {
  it('should render without errors', () => {
    const props = { ...childrenProductsPropsSample, t };

    expect(() => render(<ChildrenProducts {...props} />)).not.to.throw();
  });
});
