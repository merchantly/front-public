import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as schemas from '../../schemas';
import Checkout from '../Checkout';
import OrderTitle from './OrderTitle';

class Order extends Component {
  render() {
    const {
      backUrl,
      coupon,
      deliveryType,
      deliveryTypes,
      errorMessage,
      fieldValues,
      fields,
      formAuthenticity,
      onDeliveryChange,
      onFieldChange,
      onPaymentChange,
      paymentType,
      paymentTypes,
      publicOffer,
      submitOrderUrl,
      ajaxOrderCheckoutEnabled,
      t,
      items,
      totalCount,
      totalPrice,
      totalVat
    } = this.props;

    return (
      <section className="b-cart">
        <div className="b-cart__content">
          <OrderTitle
            t={t}
            totalCount={totalCount}
            totalPrice={totalPrice}
            totalVat={totalVat}
          />
          <Checkout
            backUrl={backUrl}
            coupon={coupon}
            deliveryType={deliveryType}
            deliveryTypes={deliveryTypes}
            errorMessage={errorMessage}
            fieldValues={fieldValues}
            fields={fields}
            formAuthenticity={formAuthenticity}
            onDeliveryChange={onDeliveryChange}
            onFieldChange={onFieldChange}
            onPaymentChange={onPaymentChange}
            paymentType={paymentType}
            paymentTypes={paymentTypes}
            publicOffer={publicOffer}
            submitOrderUrl={submitOrderUrl}
            ajaxOrderCheckoutEnabled={ajaxOrderCheckoutEnabled}
            totalCount={totalCount}
            totalPrice={totalPrice}
            items={items}
            t={t}
          />
        </div>
      </section>
    );
  }
}

Order.propTypes = {
  backUrl: PropTypes.string,
  coupon: PropTypes.object.isRequired,
  deliveryType: PropTypes.object.isRequired,
  deliveryTypes: PropTypes.array.isRequired,
  errorMessage: PropTypes.string,
  fieldValues: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  formAuthenticity: schemas.formAuthenticity,
  onDeliveryChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onPaymentChange: PropTypes.func.isRequired,
  paymentType: PropTypes.object.isRequired,
  paymentTypes: PropTypes.array.isRequired,
  publicOffer: schemas.checkoutPublicOffer,
  submitOrderUrl: PropTypes.string,
  ajaxOrderCheckoutEnabled: PropTypes.bool,
  t: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  totalPrice: PropTypes.object.isRequired,
  items: PropTypes.array,
  totalVat: PropTypes.object.isRequired,
};

export default Order;
