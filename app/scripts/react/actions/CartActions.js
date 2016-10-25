import {
  cartsShow,
} from '../../routes/api';
import {
  CALL_API,
} from '../middleware/api';
import {
  camelizeKeys,
} from 'humps';

export const CART_REQUEST = 'CART_REQUEST';
export const CART_SUCCESS = 'CART_SUCCESS';
export const CART_FAILURE = 'CART_FAILURE';

export const CART_SET_AMOUNT = 'CART_SET_AMOUNT';
export const CART_SET_PACKAGE = 'CART_SET_PACKAGE';
export const CART_INIT_CHECKOUT = 'CART_INIT_CHECKOUT';
export const CART_SET_FIELD_VALUE = 'CART_SET_FIELD_VALUE';
export const CART_SELECT_DELIVERY = 'CART_SELECT_DELIVERY';
export const CART_SELECT_PAYMENT = 'CART_SELECT_PAYMENT';

export function setAmount(id, amount) {
  return {
    type: CART_SET_AMOUNT,
    id,
    amount,
  };
}

export function selectPackage(id) {
  return {
    type: CART_SET_PACKAGE,
    id,
  };
}

export function selectDelivery(id) {
  return {
    type: CART_SELECT_DELIVERY,
    id,
  };
}

export function selectPayment(id) {
  return {
    type: CART_SELECT_PAYMENT,
    id,
  };
}

export function initCart(initialCart) {
  return {
    type: CART_SUCCESS,
    response: camelizeKeys(initialCart),
  };
}

export function changeFieldValue(name, value) {
  return {
    type: CART_SET_FIELD_VALUE,
    name,
    value,
  };
}

export function initCheckout(params) {
  const {
    deliveryTypes,
    deliveryTypeId,
    paymentTypes,
    paymentTypeId,
    cart,
    coupon,
    fields,
  } = camelizeKeys(params);

  return {
    type: CART_INIT_CHECKOUT,
    data: {
      deliveryTypes,
      paymentTypes,
      cart,
      coupon,
      checkoutFields: fields,
      selectedDeliveryType: deliveryTypeId,
      selectedPaymentType: paymentTypeId,
    },
  };
}

export function fetchCart() {
  return (dispatch, getState) => {
    const isFetching = getState().cart.isFetching;

    if (isFetching) {
      return null;
    }

    return dispatch({
      [CALL_API]: {
        endpoint: cartsShow(),
        types: [
          CART_REQUEST,
          CART_SUCCESS,
          CART_FAILURE,
        ],
      },
    });
  };
}
