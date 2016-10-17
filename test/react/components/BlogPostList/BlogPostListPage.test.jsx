/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import BlogPostListPage from 'rc/BlogPostList/BlogPostListPage';
import props from 'test/fixtures/blogPostList/page-sample.json';

describe('[Component] BlogPostListPage', () => {
  it('should render without errors', () => {
    expect(() => render(<BlogPostListPage {...props} />)).not.to.throw();
  });
});
