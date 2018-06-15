import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import BlogPostContainer from './index';

class BlogPostPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      date,
      title,
      text,
      prev,
      next,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <BlogPostContainer {...{
          i18n,
          date,
          title,
          text,
          prev,
          next,
        }} />
      </VendorLayoutContainer>
    );
  }
}

BlogPostPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  prev: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  next: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default BlogPostPage;
