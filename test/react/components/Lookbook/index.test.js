/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import lookbookProps from 'test/fixtures/lookbook/sample';

import Lookbook from 'rc/Lookbook';

describe('[Component] Lookbook', () => {
  it('should render basic component without errors', () => {
    expect(() => render(<Lookbook {...lookbookProps} />)).to.not.throw();
  });
});