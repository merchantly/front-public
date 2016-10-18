/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import Dictionary from 'rc/Dictionary';

describe('[Component] Dictionary', () => {
  it('should render basic component without errors', () => {
    expect(() => render(<Dictionary title="title" />)).to.not.throw();
  });
});
