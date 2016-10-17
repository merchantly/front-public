/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import BlogPost from 'rc/BlogPost';
import props from 'test/fixtures/blogPost/sample.json';

describe('[Component] BlogPost', () => {
  it('should render basic component without errors', () => {
    expect(() => render(<BlogPost {...props} />)).not.to.throw();
  });
});
