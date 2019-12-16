import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import BlogPostListContainer from './index';
import BlogPostList from './BlogPostList';

class BlogPostListPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      blogPosts,
      recommendedProducts,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <BlogPostListContainer blogPosts={blogPosts} recommendedProducts={recommendedProducts}/>
      </VendorLayoutContainer>
    );
  }
}

BlogPostListPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  blogPosts: BlogPostList.propTypes.blogPosts,
  recommendedProducts: PropTypes.object,
};

BlogPostListPage.defaultProps = {
  recommendedProducts: { showCartButton: false, products: [] },
}

export default BlogPostListPage;
