import React, { Component, PropTypes } from 'react';

class PostProducts extends Component {
  render() {
    const {
      postProductsText,
      title,
    } = this.props;

    return (
      <section className="b-item-list">
        {title && (
          <h1 className="b-item-full__title" dangerouslySetInnerHTML={{ __html: title }} />
        )}
        <div dangerouslySetInnerHTML={{ __html: postProductsText }} />
      </section>
    );
  }
}

PostProducts.propTypes = {
  postProductsText: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default PostProducts;
