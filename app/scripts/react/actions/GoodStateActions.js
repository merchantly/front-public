import * as apiRoutes from 'scripts/routes/api';
import { CALL_API } from 'r/middleware/api';
import { each } from 'lodash-es';

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

const param_key = function(globalId, key) {
  return "cart_items[" + globalId + "][" + key + "]"
}

export function addGoods(productGlobalId, items, count=1, weight=null) {
  const data = {}
  each(items, (item) => {
    data[param_key(item.good.globalId, 'count')] = item.count;
    data[param_key(item.good.globalId, 'weight')] = item.weight;
    data[param_key(item.good.globalId, 'product_price_id')] = item.good.actualPrice.id;
  });

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
        data: data
      },
    },
    goodId: productGlobalId,
  };
}
export function addGood(good, count=1, weight=null, changeExistCount=false) {
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
          'cart_item[product_price_id]': good.actualPrice.id,
          'change_exist_count': changeExistCount,
          count,
          weight,
        },
      },
    },
    goodId: good.globalId,
  };
}
