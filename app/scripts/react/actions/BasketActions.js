import * as apiRoutes from 'scripts/routes/api';
import { CALL_API } from 'r/middleware/api';

export const BASKET_REQUEST = 'BASKET_REQUEST';
export const BASKET_SUCCESS = 'BASKET_SUCCESS';
export const BASKET_FAILURE = 'BASKET_FAILURE';

export const BASKET_ADD_GOOD_REQUEST = 'BASKET_ADD_GOOD_REQUEST';
export const BASKET_ADD_GOOD_SUCCESS = 'BASKET_ADD_GOOD_SUCCESS';
export const BASKET_ADD_GOOD_FAILURE = 'BASKET_ADD_GOOD_FAILURE';

export const BASKET_GOOD_RESET = 'BASKET_GOOD_RESET';

export function initBasket() {
  return {
    [CALL_API]: {
      endpoint: apiRoutes.cartsShow(),
      types: [
        BASKET_REQUEST,
        BASKET_SUCCESS,
        BASKET_FAILURE,
      ],
      data: {
        dataType: 'json',
        method: 'get',
      },
    },
  };
}

export function resetGoodState(goodId) {
  return {
    type: BASKET_GOOD_RESET,
    goodId,
  };
}

export function addGood(good, count=1, weight=null) {
  return {
    [CALL_API]: {
      endpoint: apiRoutes.cartItems(),
      types: [
        BASKET_ADD_GOOD_REQUEST,
        BASKET_ADD_GOOD_SUCCESS,
        BASKET_ADD_GOOD_FAILURE,
      ],
      data: {
        dataType: 'json',
        method: 'post',
        data: {
          'cart_item[good_id]': good.global_id,
          count,
          weight,
        },
      },
    },
    goodId: good.global_id,
  };
}
