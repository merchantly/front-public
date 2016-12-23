import * as apiRoutes from 'scripts/routes/api';
import { CALL_API } from 'r/middleware/api';

export const GOOD_ADD_REQUEST = 'GOOD_ADD_REQUEST';
export const GOOD_ADD_SUCCESS = 'GOOD_ADD_SUCCESS';
export const GOOD_ADD_FAILURE = 'GOOD_ADD_FAILURE';

export const GOOD_STATE_RESET = 'GOOD_STATE_RESET';

export function resetGoodState(goodId) {
  return {
    type: GOOD_STATE_RESET,
    goodId,
  };
}

export function addGood(good, count=1, weight=null) {
  return {
    [CALL_API]: {
      endpoint: apiRoutes.cartItems(),
      types: [
        GOOD_ADD_REQUEST,
        GOOD_ADD_SUCCESS,
        GOOD_ADD_FAILURE,
      ],
      data: {
        dataType: 'json',
        method: 'post',
        data: {
          'cart_item[good_id]': good.globalId,
          count,
          weight,
        },
      },
    },
    goodId: good.globalId,
  };
}
