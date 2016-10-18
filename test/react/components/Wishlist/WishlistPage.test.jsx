/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import WishlistPage from 'rc/Wishlist/WishlistPage';
import props from 'test/fixtures/wishlist/page-sample.json';

describe('[Component] WishlistPage', () => {
  it('should render without errors', () => {
    expect(() => render(<WishlistPage {...props} />)).not.to.throw();
  });
});
