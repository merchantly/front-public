/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import BlogPostPage from 'rc/BlogPost/BlogPostPage';
import props from 'test/fixtures/blogPost/page-sample.json';

describe('[Component] BlogPostPage', () => {
  it('should render without errors', () => {
    expect(() => render(<BlogPostPage {...props} />)).not.to.throw();
  });
});
