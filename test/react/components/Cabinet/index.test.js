/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import cabinetProps from 'test/fixtures/cabinet/sample';

import Cabinet from 'rc/Cabinet';

describe('[Component] Cabinet', () => {
  it('should render basic component without errors', () => {
    expect(() => render(<Cabinet {...cabinetProps} />)).to.not.throw();
  });
});