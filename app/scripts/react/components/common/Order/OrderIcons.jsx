import React from 'react';
import PropTypes from 'prop-types';

import FaIcon from '../FaIcon';
import provideTranslations from 'rc/HoC/provideTranslations';

import { 
  PAYMENT_STATE_AWAIT, 
  PAYMENT_STATE_DIRECT,
  PAYMENT_STATE_CANCELED,
  PAYMENT_STATE_PAID 
} from 'r/constants/paymentConstants';

import {
  DELIVERY_STATE_NEW,
  DELIVERY_STATE_DELIVERY,
  DELIVERY_STATE_DONE,
  DELIVERY_STATE_NOT_NEEDED,
  DELIVERY_STATE_CANCELED
} from 'r/constants/deliveryConstants';

import {
  RESERVATION_TYPE_BOTH,
  RESERVATION_TYPE_REMOTE,
  RESERVATION_TYPE_LOCAL,
} from 'r/constants/reservationConstants';

import { OrderDeliveryStateLabel, OrderPaymentStateLabel } from './OrderLabels';


function OrderPaymentIcon({ type, orderPaymentType }) {
  if (type == 'OrderPaymentDirect') {
    return <FaIcon name='money' tooltip='true' title={orderPaymentType} />
  } else {
    return <FaIcon name='credit-card' tooltip='true' title={orderPaymentType} />
  }
};

function OrderDeliveryIcon({ state, orderDeliveryState }) {
  switch(state) {
  case DELIVERY_STATE_NEW: 
    return <FaIcon name='hourglass' tooltip='true' title={orderDeliveryState} addClass='text-warning' />
  case DELIVERY_STATE_DELIVERY:
    return <FaIcon name='truck' tooltip='true' title={orderDeliveryState} addClass='text-info' />
  case DELIVERY_STATE_DONE:
    return <FaIcon name='check' tooltip='true' title={orderDeliveryState} addClass='text-success' />
  case DELIVERY_STATE_NOT_NEEDED:
    return <FaIcon name='ban' tooltip='true' title={orderDeliveryState} />
  case DELIVERY_STATE_CANCELED:
    return <FaIcon name='frown-o' tooltip='true' title={orderDeliveryState} addClass='text-warning' />  
  default:
    return <OrderDeliveryStateLabel state={state} orderDeliveryState={orderDeliveryState} />
  }
};

const OrderPaymentStateIcon = provideTranslations(({ state, updatedAt, orderPaymentType, orderPaymentState, t }) => {
  switch(state) {
  case PAYMENT_STATE_AWAIT:
  case PAYMENT_STATE_DIRECT: 
    return <FaIcon name='hourglass' tooltip='true' title={t('vendor.order_payment_state_icon.wait')} addClass='text-warning' />
  case PAYMENT_STATE_CANCELED:
    return <FaIcon name='ban' tooltip='true' title={t('vendor.order_payment_state_icon.wait')} addClass='text-danger' />
  case PAYMENT_STATE_PAID:
    return <FaIcon name='check' tooltip='true' title={t('vendor.order_payment_state_icon.paid', {updatedAt: updatedAt})} addClass='text-success' />
  default:
    return <OrderPaymentStateLabel state={state} updatedAt={updatedAt} orderPaymentType={orderPaymentType} orderPaymentState={orderPaymentState} />
  }
});

const OrderReserveStateIcon = provideTranslations(({ type, reservedAt, t }) => {
  switch(type) {
  case RESERVATION_TYPE_BOTH: 
    return <FaIcon name='shopping-cart' tooltip='true' title={t('vendor.order_reserve_state_icon.both', {reservedAt: reservedAt})} addClass='text-navy' />
  case RESERVATION_TYPE_REMOTE:
    return <FaIcon name='shopping-cart' tooltip='true' title={t('vendor.order_reserve_state_icon.remote', {reservedAt: reservedAt})} addClass='text-navy' />
  case RESERVATION_TYPE_LOCAL:
    return <FaIcon name='shopping-cart' tooltip='true' title={t('vendor.order_reserve_state_icon.local', {reservedAt: reservedAt})} addClass='text-warning' />
  default:
    return <FaIcon name='calendar-minus-o' addClass='text-danger' tooltip='true' title={t('operator.order.labels.not_reserved')} />
  }
});

OrderPaymentIcon.propTypes = {
  orderPaymentType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

OrderPaymentStateIcon.propTypes = {
  state: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

OrderDeliveryIcon.propTypes = {
  state: PropTypes.string.isRequired,
  orderDeliveryState: PropTypes.string.isRequired,
};

OrderReserveStateIcon.propTypes = {
  type: PropTypes.string.isRequired,
  reservedAt: PropTypes.string.isRequired,
};

export { OrderReserveStateIcon, OrderDeliveryIcon, OrderPaymentIcon, OrderPaymentStateIcon };