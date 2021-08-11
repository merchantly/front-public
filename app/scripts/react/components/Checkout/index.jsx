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
import {find, head} from "lodash";
import geideaPaymentWidget from 'app/scripts/lib/geideaPaymentWidget';

class Checkout extends Component {
  constructor(props) {
    super(props);

    const {
      errorMessage,
      fields
    } = props;

    this.state = { errorMessage: errorMessage, fields: fields, isProcessing: false, isRedirecting: false };

    this.startProcessing = this.startProcessing.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      errorMessage,
      fields
    } = nextProps;

    this.setState({ errorMessage: errorMessage, fields: fields });
  }

  async handleSubmit(event) {
    const { paymentType } = this.props;

    if(!paymentType.isGeideaPayment || paymentType.isEInvoice)
      return;

    event.preventDefault();

    const data = new FormData(event.target);

    const { submitOrderUrl } = this.props;

    const response = await fetch(submitOrderUrl + '.json', {
      method: 'POST',
      body: data,
    });

    if (response.ok) {
      const order = await response.json();

      if (order.id) {
        geideaPaymentWidget(order)
        this.setState({ isProcessing: false, isRedirecting: false })
      } else {
        const { deliveryType } = this.props;

        const updatedDeliveryType = find(
          order.deliveryTypes,
          (t) => t.id === deliveryType.id
        ) || head(order.deliveryTypes);

        this.setState({ fields: updatedDeliveryType.fields, isProcessing: false, isRedirecting: false })
      }
    } else {
      const errorText = await response.text();
      alert('Order fetch error:' + errorText)
    }
  }

  handleClick(ev) {
    const { backUrl } = this.props;

    this.setState({ isRedirecting: true });
    if (!backUrl) {
      ev.preventDefault();
      window.history.back();
    }
  }

  startProcessing() {
    try {
      $(window).trigger('m.checkout', {
        items: this.props.items,
        totalCount: this.props.totalCount,
        totalPrice: this.props.totalPrice
      });
    } catch (e) {
      console.log('trigger: ', e.message);
    }

    this.setState({ isProcessing: true });
  }

  render() {
    const {
      backUrl,
      coupon,
      deliveryType,
      deliveryTypes,
      fieldValues,
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
      fields,
      isProcessing,
      isRedirecting
    } = this.state

    return (
      <form
        acceptCharset="UTF-8"
        action={submitOrderUrl}
        className="simple_form new_vendor_order"
        id="new_vendor_order"
        method="POST"
        onSubmit={this.handleSubmit.bind(this)}
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
              isProcessing={isProcessing}
              isRedirecting={isRedirecting}
              startProcessing={this.startProcessing}
              handleClick={this.handleClick}
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
