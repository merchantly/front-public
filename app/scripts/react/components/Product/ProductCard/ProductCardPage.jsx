import React, { Component, PropTypes } from 'react';
import VendorLayoutContainer from 'rc/VendorLayout';
import ProductCard from './ProductCard';
import * as schemas from 'r/schemas';

class ProductCardPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      addWishlistUrl,
      formAuthenticity,
      hasWishlist,
      hasComments,
      disqusUrl,
      isWishlisted,
      product,
      similarProducts,
      otherProducts,
      wishlistUrl,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <ProductCard {...{
          addWishlistUrl,
          disqusUrl,
          formAuthenticity,
          hasWishlist,
          hasComments,
          i18n,
          isWishlisted,
          otherProducts,
          product,
          similarProducts,
          wishlistUrl,
        }} />
      </VendorLayoutContainer>
    );
  }
}

ProductCardPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  addWishlistUrl: PropTypes.string,
  formAuthenticity: schemas.formAuthenticity,
  hasWishlist: PropTypes.bool,
  hasComments: PropTypes.bool,
  disqusUrl: PropTypes.string,
  isWishlisted: PropTypes.bool,
  product: schemas.product,
  similarProducts: PropTypes.arrayOf(schemas.product),
  otherProducts: PropTypes.arrayOf(schemas.product),
  wishlistUrl: PropTypes.string,
};

export default ProductCardPage;
