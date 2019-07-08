import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import ProductCardGalleryImage from './ProductCardGalleryImage';
import ProductCardGallerySlider from './ProductCardGallerySlider';

class ProductCardGallery extends Component {
  render() {
    const { isKioskEnvironment } = this.props;

    if (isKioskEnvironment) {
      return <ProductCardGallerySlider {...this.props} />;
    } else {
      return <ProductCardGalleryImage {...this.props} />;
    }
  }
}

ProductCardGallery.propTypes = {
  isKioskEnvironment: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      url: PropTypes.string.isRequired,
    }),
  ),
  rtl: PropTypes.bool.isRequired,
};
ProductCardGallery.defaultProps = {
  images: [],
  rtl: false,
};

export default ProductCardGallery;
