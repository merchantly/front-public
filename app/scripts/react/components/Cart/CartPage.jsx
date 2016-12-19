import React, { Component, PropTypes } from 'react';
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
      isHeaderButtons
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
          initialCart={initialCart}
          initialPackages={initialPackages}
          isTesting={isTesting}
          minimalPrice={minimalPrice}
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
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
};

CartPage.defaultProps = {

};

export default CartPage;
