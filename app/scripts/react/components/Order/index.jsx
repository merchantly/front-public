import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as schemas from '../../schemas';
import connectToRedux from '../HoC/connectToRedux';
import provideTranslations from '../HoC/provideTranslations';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Order from './Order';
import diff from 'deep-diff';
import {
  changeFieldValue,
  initCheckout,
  selectDelivery,
  selectPayment,
} from '../../actions/CartActions';
import {
  canUseDOM,
} from '../../helpers/dom';
import { find, head, includes } from 'lodash';
import { updateIn, getIn } from 'timm';

let storeInitialized = false;

class OrderContainer extends Component {
  constructor(props) {
    super(props);

    this.selectDelivery = this.selectDelivery.bind(this);
    this.selectPayment = this.selectPayment.bind(this);
    this.changeFieldValue = this.changeFieldValue.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !!diff(this.props, nextProps);
  }
  componentWillMount() {
    const {
      initCheckout,
      initialProps,
    } = this.props;

    if (!storeInitialized && canUseDOM()) {
      initCheckout(initialProps);
      storeInitialized = true;
    }
  }
  selectDelivery(delivery) {
    this.props.selectDelivery(delivery.id);
  }
  selectPayment(payment) {
    this.props.selectPayment(payment.id);
  }
  changeFieldValue(name, value) {
    this.props.changeFieldValue(name, value);
  }
  render() {
    const {
      coupon,
      fields,
      formValues,
      deliveryTypes,
      selectedDeliveryType,
      paymentTypes,
      selectedPaymentType,
      initialProps: {
        backUrl,
        errorMessage,
        formAuthenticity,
        publicOffer,
        submitOrderUrl,
        t,
      },
      totalCount,
      totalPrice,
      items,
    } = this.props;


    return (
      <Order
        backUrl={backUrl}
        coupon={coupon}
        deliveryType={selectedDeliveryType}
        deliveryTypes={deliveryTypes}
        errorMessage={errorMessage}
        fieldValues={formValues}
        fields={fields}
        formAuthenticity={formAuthenticity}
        onDeliveryChange={this.selectDelivery}
        onFieldChange={this.changeFieldValue}
        onPaymentChange={this.selectPayment}
        paymentType={selectedPaymentType}
        paymentTypes={paymentTypes}
        publicOffer={publicOffer}
        submitOrderUrl={submitOrderUrl}
        t={t}
        items={this.props.initialProps.cart.items}
        totalCount={totalCount}
        totalPrice={totalPrice}
      />
    );
  }
}

OrderContainer.propTypes = {
  coupon: PropTypes.object.isRequired,
  deliveryTypes: PropTypes.array.isRequired,
  selectedDeliveryType: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  paymentTypes: PropTypes.array.isRequired,
  initCheckout: PropTypes.func.isRequired,
  selectedPaymentType: PropTypes.object.isRequired,
  selectDelivery: PropTypes.func.isRequired,
  selectPayment: PropTypes.func.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  initialProps: PropTypes.shape({
    backUrl: PropTypes.string,
    deliveryTypeId: PropTypes.number,
    deliveryTypes: PropTypes.arrayOf(schemas.deliveryType),
    errorMessage: PropTypes.string,
    formValues: PropTypes.object.isRequired,
    formAuthenticity: schemas.formAuthenticity,
    paymentTypeId: PropTypes.number,
    paymentTypes: PropTypes.arrayOf(schemas.paymentType),
    publicOffer: schemas.checkoutPublicOffer,
    submitOrderUrl: PropTypes.string,
    t: PropTypes.func.isRequired,
  }),
  items: PropTypes.array,
  totalCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.object.isRequired,
};

OrderContainer.defaultProps = {
  deliveryTypes: [],
  paymentTypes: []
};

export default provideTranslations(connectToRedux(connect(
  (state, ownProps) => {

    const cart = storeInitialized ?
      state.cart :
      { ...state.cart, ...initCheckout(ownProps).data }; // TODO: move to store initialization when/if root component created

    const {
      coupon={},
      deliveryTypes=[],
      cart: {
        totalCount=0,
        totalPrice: cartTotalPrice={},
      }={},
      items,
      formValues,
      selectedDeliveryType: selectedDeliveryTypeId,
      selectedPaymentType: selectedPaymentTypeId,
    } = cart;

    const selectedDeliveryType = find(
      deliveryTypes,
      (t) => t.id === selectedDeliveryTypeId
    ) || head(deliveryTypes) || {};

    const {
      availablePayments=[],
      fields=[],
    } = selectedDeliveryType;

    const paymentTypes = (cart.paymentTypes || [])
      .filter((p) => includes(availablePayments, p.id));

    const selectedPaymentType = find(
      paymentTypes,
      (p) => p.id === selectedPaymentTypeId
    ) || head(paymentTypes) || {};

    const totalPrice = updateIn(cartTotalPrice, ['cents'], (cents) => {
        if (cents == null) {
          return cents;
        }

        const paymentDiscounts = getIn(selectedPaymentType, ['paymentDiscounts'])

        if (paymentDiscounts && paymentDiscounts.length) {
          const paymentDiscount = find(
            paymentDiscounts,
            (pd) => pd.deliveryId === selectedDeliveryTypeId
          )

          if (paymentDiscount) {
            if(paymentDiscount.type == 'percent') {
              cents = cents - (cents * paymentDiscount.discount / 100)
            } else {
              cents = cents - paymentDiscount.discount
            }
          }
        }

        const threshold = getIn(selectedDeliveryType, ['freeDeliveryThreshold', 'cents']);
        const deliveryPrice = getIn(selectedDeliveryType, ['price', 'cents']) || 0;

        return cents + ((threshold == null || threshold > cents) ? deliveryPrice : 0);
    });

    return {
      coupon,
      fields,
      formValues,
      deliveryTypes,
      selectedDeliveryType,
      paymentTypes,
      selectedPaymentType,
      totalCount,
      totalPrice,
      items
    };
  },
  {
    changeFieldValue,
    initCheckout,
    selectDelivery,
    selectPayment,
  },
  (stateProps, dispatchProps, ownProps) => Object.assign({}, {
    initialProps: ownProps,
  }, stateProps, dispatchProps)
)(OrderContainer)));
