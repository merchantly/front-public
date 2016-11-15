import createReducer from 'r/utils/createReducer';
import {
  BASKET_REQUEST,
  BASKET_SUCCESS,
  BASKET_FAILURE,
  BASKET_ADD_GOOD_REQUEST,
  BASKET_ADD_GOOD_SUCCESS,
  BASKET_ADD_GOOD_FAILURE,
  BASKET_GOOD_RESET,
} from 'r/actions/BasketActions';
import { set, setIn, merge, mergeIn } from 'timm';

const initialState = {
  basket: {},
  isFetching: false,
  error: null,
  goodState: {},
};

const actionMap = {
  [BASKET_REQUEST](state) {
    return merge(state, {
      isFetching: true,
      error: null,
    });
  },
  [BASKET_SUCCESS](state, { response }) {
    return merge(state, {
      basket: response,
      isFetching: false,
      error: null,
    });
  },
  [BASKET_FAILURE](state, { error }) {
    return merge(state, {
      error,
      isFetching: false,
    });
  },
  [BASKET_GOOD_RESET](state, { goodId }) {
    return setIn(state, ['goodState', goodId], void 0);
  },
  [BASKET_ADD_GOOD_REQUEST](state, { goodId }) {
    return mergeIn(state, ['goodState', goodId], {
      isFetching: true,
      error: null,
    });
  },
  [BASKET_ADD_GOOD_SUCCESS](state, { response, goodId }) {
    return mergeIn(
      set(state, 'basket', response),
      ['goodState', goodId],
      {
        isFetching: false,
        error: null,
      }
    );
  },
  [BASKET_ADD_GOOD_FAILURE](state, { error, goodId }) {
    return mergeIn(state, ['goodState', goodId], {
      isFetching: false,
      error,
    });
  },
};

export default createReducer(initialState, actionMap);
