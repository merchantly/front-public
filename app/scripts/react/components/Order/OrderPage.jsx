import React, { Component, PropTypes } from 'react';
import VendorLayoutContainer from 'rc/VendorLayout';
import OrderContainer from './index';
import * as schemas from 'r/schemas';

class OrderPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      backUrl,
      coupon,
      deliveryTypeId,
      deliveryTypes,
      errorMessage,
      fields,
      formAuthenticity,
      paymentTypeId,
      paymentTypes,
      publicOffer,
      submitOrderUrl,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps}
        i18n={i18n}
        showClientBar={false}
      >
        <OrderContainer {...{
          i18n,
          backUrl,
          coupon,
          deliveryTypeId,
          deliveryTypes,
          errorMessage,
          fields,
          formAuthenticity,
          paymentTypeId,
          paymentTypes,
          publicOffer,
          submitOrderUrl,
        }}/>
      </VendorLayoutContainer>
    );
  }
}

OrderPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,

  // OrderContainer props
  backUrl: PropTypes.string,
  coupon: PropTypes.object.isRequired,
  deliveryTypeId: PropTypes.number,
  deliveryTypes: PropTypes.arrayOf(schemas.deliveryType),
  errorMessage: PropTypes.string,
  fields: PropTypes.arrayOf(schemas.checkoutField),
  formAuthenticity: schemas.formAuthenticity,
  paymentTypeId: PropTypes.number,
  paymentTypes: PropTypes.arrayOf(schemas.paymentType),
  publicOffer: schemas.checkoutPublicOffer,
  submitOrderUrl: PropTypes.string,
};

OrderPage.defaultProps = {

};

export default OrderPage;
