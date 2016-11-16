import createReducer from 'r/utils/createReducer';
import {
  CART_REQUEST,
  CART_SUCCESS,
  CART_FAILURE,
  CART_SET_AMOUNT,
  CART_SET_PACKAGE_COUNT,
  CART_SET_PACKAGE,
  CART_INIT_CHECKOUT,
  CART_SET_FIELD_VALUE,
  CART_SELECT_DELIVERY,
  CART_SELECT_PAYMENT,
} from 'r/actions/CartActions';
import {
  GOOD_ADD_SUCCESS,
} from 'r/actions/GoodStateActions';
import { merge, set, setIn, getIn } from 'timm';
import { reduce } from 'lodash';

const initialState = {
  cart: {},
  coupon: {
    show: true,
    value: '',
  },
  amounts: {},
  packageCount: 0,
  selectedPackage: '',
  deliveryTypes: [],
  selectedDeliveryType: null,
  paymentTypes: [],
  selectedPaymentType: null,
  checkoutFields: [],
  checkoutFieldValues: {},
  isFetching: false,
  error: null,
};

export function initCartStore(state, { response }) {
  const amounts = reduce(response.items, (result, item) => {
    const isSellingByWeight = getIn(item, ['good', 'sellingByWeight']);

    result[item.id] = isSellingByWeight
      ? parseFloat(item.weight || 0)
      : parseInt(item.count || 0, 10);
    return result;
  }, {});
  const packageCount = getIn(response, ['packageItem', 'count']) || 1;

  return merge(state, {
    amounts,
    packageCount,
    coupon: {
      show: true,
      value: response.couponCode,
    },
    cart: response,
    isFetching: false,
    error: null,
  });
}

export function initCheckoutCartStore(state, { data }) {
  const checkoutFieldValues = reduce(data.checkoutFields, (result, field) => {
    result[field.name] = { value: field.value };
    return result;
  }, {});

  return merge(state, data, { checkoutFieldValues });
}

const actionMap = {
  [CART_REQUEST](state) {
    return merge(state, {
      isFetching: true,
      error: null,
    });
  },

  [CART_SUCCESS](state, action) {
    return initCartStore(state, action);
  },

  [GOOD_ADD_SUCCESS](state, action) {
    return initCartStore(state, action);
  },

  [CART_FAILURE](state, { error }) {
    return merge(state, {
      isFetching: false,
      error,
    });
  },

  [CART_SET_AMOUNT](state, { id, amount }) {
    return setIn(state, ['amounts', id], amount);
  },

  [CART_SET_PACKAGE](state, { id }) {
    return merge(state, {
      selectedPackage: id,
      packageCount: Math.max(1, state.packageCount),
    });
  },

  [CART_SET_PACKAGE_COUNT](state, { count }) {
    return set(state, 'packageCount', count);
  },

  [CART_INIT_CHECKOUT](state, action) {
    return initCheckoutCartStore(state, action);
  },

  [CART_SET_FIELD_VALUE](state, { name, value }) {
    return setIn(state, ['checkoutFieldValues', name, 'value'], value);
  },

  [CART_SELECT_DELIVERY](state, { id }) {
    return set(state, 'selectedDeliveryType', id);
  },

  [CART_SELECT_PAYMENT](state, { id }) {
    return set(state, 'selectedPaymentType', id);
  },
};

export default createReducer(initialState, actionMap);
