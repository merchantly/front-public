/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import WelcomePage from 'rc/Welcome/WelcomePage';
import props from 'test/fixtures/welcome/page-sample.json';

describe('[Component] WelcomePage', () => {
  it('should render without errors', () => {
    expect(() => render(<WelcomePage {...props} />)).not.to.throw();
  });
});
