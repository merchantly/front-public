import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as schemas from '../../schemas';
import { vendorOrder } from '../../../routes/app';

import Alert from '../common/Alert';
import FormAuthenticity from '../common/FormAuthenticity';
import CheckoutActions from './CheckoutActions';
import CheckoutStep from './CheckoutStep';
import CheckoutDeliveries from './CheckoutDeliveries';
import CheckoutFields from './CheckoutFields';
import CheckoutPayments from './CheckoutPayments';
import CheckoutCoupon from './CheckoutCoupon';

class Checkout extends Component {
  render() {
    const {
      backUrl,
      coupon,
      deliveryType,
      deliveryTypes,
      errorMessage,
      fields,
      fieldValues,
      formAuthenticity,
      onDeliveryChange,
      onFieldChange,
      onPaymentChange,
      paymentType,
      paymentTypes,
      publicOffer,
      submitOrderUrl,
      t,
    } = this.props;

    return (
      <form
        acceptCharset="UTF-8"
        action={submitOrderUrl}
        className="simple_form new_vendor_order"
        id="new_vendor_order"
        method="POST"
        noValidate
      >
        <FormAuthenticity {...formAuthenticity} />
        <div className="b-cart__form b-form">
          {errorMessage
            ? (
              <Alert
                className="cart-info"
                danger
                text={errorMessage}
              />
            )
            : null
          }
          <div className="b-cart__form__inner">
            <CheckoutStep number={1} title={t('vendor.order.new.delivery_title')}>
              <CheckoutDeliveries
                current={deliveryType}
                items={deliveryTypes}
                onChange={onDeliveryChange}
                t={t}
              />
            </CheckoutStep>
            <CheckoutStep number={2} title={t('vendor.order.new.contacts_title')}>
              <CheckoutFields
                deliveryType={deliveryType}
                values={fieldValues}
                fields={fields}
                onChange={onFieldChange}
              />
              {!!coupon.show &&
                <CheckoutCoupon code={coupon.value} t={t} />
              }
            </CheckoutStep>
            <CheckoutStep number={3} title={t('vendor.order.new.payment_title')}>
              <CheckoutPayments
                current={paymentType}
                items={paymentTypes}
                onChange={onPaymentChange}
              />
            </CheckoutStep>
          </div>
          <div className="b-form__row">
            <CheckoutActions
              cart={cart}
              backUrl={backUrl}
              publicOffer={publicOffer}
              t={t}
            />
          </div>
        </div>
      </form>
    );
  }
}

Checkout.propTypes = {
  backUrl: PropTypes.string,
  coupon: PropTypes.object.isRequired,
  deliveryType: PropTypes.object.isRequired,
  deliveryTypes: PropTypes.array.isRequired,
  errorMessage: PropTypes.string,
  fieldValues: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(schemas.checkoutField).isRequired,
  formAuthenticity: schemas.formAuthenticity,
  onDeliveryChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onPaymentChange: PropTypes.func.isRequired,
  paymentType: PropTypes.object.isRequired,
  paymentTypes: PropTypes.array.isRequired,
  publicOffer: schemas.checkoutPublicOffer,
  submitOrderUrl: PropTypes.string,
  t: PropTypes.func.isRequired,
};
Checkout.defaultProps = {
  formAuthenticity: {},
  submitOrderUrl: vendorOrder(),
};

export default Checkout;
