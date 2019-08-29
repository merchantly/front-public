import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import ProductCard from './ProductCard';
import * as schemas from 'r/schemas';

class ProductCardPage extends Component {
  componentDidMount() {
    try {
      $(window).trigger('m.product', [this.props.product]);
    } catch (e) {
      console.log('trigger: ', e.message);
    }
  }

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
      isOneClickBuy,
      newOrderUrl,
      multipleChoice,
      deliveryRestrictionMessages,
      notAvailableContent,
      showAuthForBuyButton,
      vendorClientSigninPath,
      rtl,
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
          isOneClickBuy,
          otherProducts,
          product,
          similarProducts,
          newOrderUrl,
          wishlistUrl,
          multipleChoice,
          deliveryRestrictionMessages,
          notAvailableContent,
          showAuthForBuyButton,
          vendorClientSigninPath,
          rtl
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
  newOrderUrl: PropTypes.string,
  similarProducts: PropTypes.arrayOf(schemas.product),
  otherProducts: PropTypes.arrayOf(schemas.product),
  multipleChoice: PropTypes.bool,
  isOneClickBuy: PropTypes.bool,
  wishlistUrl: PropTypes.string,
  deliveryRestrictionMessages: PropTypes.arrayOf(PropTypes.string),
  notAvailableContent: PropTypes.string,
  showAuthForBuyButton: PropTypes.bool,
  vendorClientSigninPath: PropTypes.string,
  rtl: PropTypes.bool,
};
ProductCardPage.defaultProps = {
  formAuthenticity: {},
  hasComments: false,
  disqusUrl: '',
  product: {},
  multipleChoice: false,
  isOneClickBuy: false,
  similarProducts: [],
  otherProducts: [],
  deliveryRestrictionMessages: [],
  notAvailableContent: '',
  showAuthForBuyButton: false,
  vendorClientSigninPath: '',
  rtl: false
};

export default ProductCardPage;
