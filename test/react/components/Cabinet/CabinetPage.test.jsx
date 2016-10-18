/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import CabinetPage from 'rc/Cabinet/CabinetPage';
import props from 'test/fixtures/cabinet/page-sample.json';

describe('[Component] CabinetPage', () => {
  it('should render without errors', () => {
    expect(() => render(<CabinetPage {...props} />)).not.to.throw();
  });
});
