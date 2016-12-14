import React, { Component, PropTypes } from 'react';

export default class ProductCardVideo extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
  }
  render() {
    const { product } = this.props;

    if (product.videoEmbedHtml) {
      return (
        <div
          className="b-item-full__video"
          dangerouslySetInnerHTML={{ __html: product.videoEmbedHtml }}
        />
      );
    }
    return null;
  }
}
