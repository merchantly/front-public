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
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <CartContainer
          formAuthenticity={formAuthenticity}
          i18n={i18n}
          initialCart={initialCart}
          initialPackages={initialPackages}
          isTesting={isTesting}
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
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
};

CartPage.defaultProps = {

};

export default CartPage;
