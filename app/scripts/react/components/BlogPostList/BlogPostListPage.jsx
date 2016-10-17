import React, { Component, PropTypes } from 'react';
import VendorLayoutContainer from 'rc/VendorLayout';
import BlogPostListContainer from './index';
import BlogPostList from './BlogPostList';

class BlogPostListPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      blogPosts,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <BlogPostListContainer blogPosts={blogPosts} />
      </VendorLayoutContainer>
    );
  }
}

BlogPostListPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  blogPosts: BlogPostList.propTypes.blogPosts,
};

export default BlogPostListPage;
