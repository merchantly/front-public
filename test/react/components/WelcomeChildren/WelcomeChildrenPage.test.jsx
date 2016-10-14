/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import WelcomeChildrenPage from 'rc/WelcomeChildren/WelcomeChildrenPage';
import props from 'test/fixtures/welcomeChildren/page-sample.json';

describe('[Component] WelcomeChildrenPage', () => {
  it('should render without errors', () => {
    expect(() => render(<WelcomeChildrenPage {...props} />)).not.to.throw();
  });
});
