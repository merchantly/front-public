import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import OrderContainer from './index';
import * as schemas from 'r/schemas';

class OrderPage extends Component {
  componentDidMount() {
    try {
      $(window).trigger('m.initial-checkout', [this.props.cart, this.props.coupon]);
    } catch (e) {
      console.log('trigger: ', e.message);
    }
  }
  render() {
    const {
      i18n,
      layoutProps,
      backUrl,
      coupon,
      deliveryTypeId,
      deliveryTypes,
      errorMessage,
      formValues,
      formAuthenticity,
      paymentTypeId,
      paymentTypes,
      publicOffer,
      submitOrderUrl,
      ajaxOrderCheckoutEnabled,
      cart
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
          formValues,
          formAuthenticity,
          paymentTypeId,
          paymentTypes,
          publicOffer,
          submitOrderUrl,
          ajaxOrderCheckoutEnabled,
          cart
        }}/>
      </VendorLayoutContainer>
    );
  }
}

OrderPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  cart: PropTypes.object,

  // OrderContainer props
  backUrl: PropTypes.string,
  coupon: PropTypes.object.isRequired,
  deliveryTypeId: PropTypes.number,
  deliveryTypes: PropTypes.arrayOf(schemas.deliveryType),
  errorMessage: PropTypes.string,
  formValues: PropTypes.object.isRequired,
  formAuthenticity: schemas.formAuthenticity,
  paymentTypeId: PropTypes.number,
  paymentTypes: PropTypes.arrayOf(schemas.paymentType),
  publicOffer: schemas.checkoutPublicOffer,
  submitOrderUrl: PropTypes.string,
  ajaxOrderCheckoutEnabled: PropTypes.bool
};

OrderPage.defaultProps = {

};

export default OrderPage;
