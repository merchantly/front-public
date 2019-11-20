import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import CartContainer from './index';
import * as schemas from 'r/schemas';

class CartPage extends Component {
  render() {
    const {
      formAuthenticity,
      i18n,
      initialCart,
      initialPackages,
      isTesting,
      layoutProps,
      minimalPrice,
      isHeaderButtons,
      continueShoppingUrl,
      deliveryRestrictionMessages,
      recommendedProducts
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps}
        i18n={i18n}
        showClientBar={false}
      >
        <CartContainer
          isHeaderButtons={isHeaderButtons}
          formAuthenticity={formAuthenticity}
          i18n={i18n}
          continueShoppingUrl={continueShoppingUrl}
          initialCart={initialCart}
          initialPackages={initialPackages}
          isTesting={isTesting}
          minimalPrice={minimalPrice}
          deliveryRestrictionMessages= {deliveryRestrictionMessages}
          recommendedProducts={recommendedProducts}
        />
      </VendorLayoutContainer>
    );
  }
}

CartPage.propTypes = {
  formAuthenticity: schemas.formAuthenticity,
  i18n: PropTypes.object,
  initialCart: PropTypes.object,
  initialPackages: PropTypes.array,
  isTesting: PropTypes.bool,
  minimalPrice: schemas.money,
  continueShoppingUrl: PropTypes.string,
  deliveryRestrictionMessages: PropTypes.arrayOf(PropTypes.string),
  recommendedProducts: PropTypes.arrayOf(schemas.product),
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
};

CartPage.defaultProps = {
  deliveryRestrictionMessages: [],
  recommendedProducts: [],
};

export default CartPage;
