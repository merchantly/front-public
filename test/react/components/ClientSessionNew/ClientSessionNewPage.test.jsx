/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import ClientSessionNewPage from 'rc/ClientSessionNew/ClientSessionNewPage';
import props from 'test/fixtures/clientSessionNew/page-sample.json';

describe('[Component] ClientSessionNewPage', () => {
  it('should render without errors', () => {
    expect(() => render(<ClientSessionNewPage {...props} />)).not.to.throw();
  });
});
