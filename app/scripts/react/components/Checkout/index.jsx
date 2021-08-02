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
  constructor(props) {
    super(props);

    const {
      errorMessage,
      fieldValues
    } = this.props;

    this.state = { errorMessage: errorMessage, fieldValues: fieldValues };
  }

  async handleSubmit(event) {
    window.debug_checkout_event = event;
    const { deliveryType } = this.props;

    if(!deliveryType.isGeideaPayment)
      return;

    event.preventDefault();

    const data = new FormData(event.target);
    window.debug_checkout_data = data;

    const { submitOrderUrl } = this.props

    const response = await fetch(submitOrderUrl + '.json', {
      method: 'POST',
      body: data,
    });
    window.debug_checkout_response = response;

    if (response.ok) {
      const order = await response.json();
      window.debug_checkout_response = order;
      const geideaPaymentForm = deliveryType.geideaPaymentForm;

      const Scriptjs = require('scriptjs');

      Scriptjs('https://www.merchant.geidea.net/hpp/geideapay.min.js', function() {
        try {
          const onSuccess = function(_data) {
            document.location.href = order.success_url;
          }

          const onError = function(data) {
            alert(data.responseCode + ': ' + data.responseMessage)
          }

          const onCancel = function(_data) {
            document.location.href = order.cancel_url;
          }

          const api = new GeideaApi(geideaPaymentForm.merchant_id, onSuccess, onError, onCancel);

          api.configurePayment({
            callbackUrl: geideaPaymentForm.callback_url,
            amount: (geideaPaymentForm.total_price.cents / 100),
            currency: geideaPaymentForm.total_price.currencyIsoCode,
            merchantReferenceId: order.id,
            styles: {
              headerColor: geideaPaymentForm.header_color
            },
          });

          api.startPayment();
        } catch(err) {
          alert(err);
        }
      })
    } else {
      let error = await response.json();

      this.setState({ errorMessage: error.errorMessage, fieldValues: error.formValues })
    }
  }

  render() {
    const {
      backUrl,
      coupon,
      deliveryType,
      deliveryTypes,
      fields,
      formAuthenticity,
      onDeliveryChange,
      onFieldChange,
      onPaymentChange,
      paymentType,
      paymentTypes,
      publicOffer,
      submitOrderUrl,
      totalCount,
      totalPrice,
      t,
      cart,
      items
    } = this.props;

    const {
      errorMessage,
      fieldValues
    } = this.state

    return (
      <form
        acceptCharset="UTF-8"
        action={submitOrderUrl}
        className="simple_form new_vendor_order"
        id="new_vendor_order"
        method="POST"
        onSubmit={this.handleSubmit}
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
                deliveryType={deliveryType}
                t={t}
              />
            </CheckoutStep>
          </div>
          <div className="b-form__row">
            <CheckoutActions
              items={items}
              totalCount={totalCount}
              totalPrice={totalPrice}
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
  totalCount: PropTypes.number,
  totalPrice: PropTypes.object.isRequired,
  items: PropTypes.array,
  t: PropTypes.func.isRequired
};
Checkout.defaultProps = {
  formAuthenticity: {},
  submitOrderUrl: vendorOrder(),
};

export default Checkout;
