import React, { PropTypes } from 'react';

import {
  DELIVERY_STATE_NEW,
  DELIVERY_STATE_DELIVERY,
  DELIVERY_STATE_DONE,
  DELIVERY_STATE_NOT_NEEDED,
  DELIVERY_STATE_CANCELED
} from 'r/constants/deliveryConstants';

import { 
  PAYMENT_STATE_AWAIT, 
  PAYMENT_STATE_DIRECT,
  PAYMENT_STATE_CANCELED,
  PAYMENT_STATE_PAID 
} from 'r/constants/paymentConstants';

function OrderDeliveryStateLabel( { state, orderDeliveryState } ) {
  let cssClass = 'label label-danger';

  switch(state) {
    case DELIVERY_STATE_NEW: 
      cssClass = 'label label-default';
      break;
    case DELIVERY_STATE_DELIVERY:
      cssClass = 'label label-info';
      break;
    case DELIVERY_STATE_DONE:
      cssClass = 'label label-success';
      break;
    case DELIVERY_STATE_NOT_NEEDED:
      cssClass = 'label label-default';
      break;
    case DELIVERY_STATE_CANCELED:
      cssClass = 'label label-warning';
      break;
    default:
      break;
  }

  return <span className={cssClass} tooltip='true'>{orderDeliveryState}</span>;
}

function OrderPaymentStateLabel({ state, updatedAt, orderPaymentType, orderPaymentState }) {
  let cssClass = 'label label-danger';

  switch(state) {
    case PAYMENT_STATE_AWAIT: 
    case PAYMENT_STATE_DIRECT:
      cssClass = 'label label-default';
      break;
    case PAYMENT_STATE_CANCELED:
      cssClass = 'label label-warning';
      break;
    case PAYMENT_STATE_PAID:
      cssClass = 'label label-success';
      break;
    default:
      break;
  }

  return <span className={cssClass} title={`$(orderPaymentType) $(updatedAt)`} tooltip='true'>{orderPaymentState}</span>;
}

export { OrderDeliveryStateLabel, OrderPaymentStateLabel };