import createReducer from 'r/utils/createReducer';
import {
  WISHLIST_REQUEST,
  WISHLIST_SUCCESS,
  WISHLIST_FAILURE,
  WISHLIST_ADD_REQUEST,
  WISHLIST_ADD_SUCCESS,
  WISHLIST_ADD_FAILURE,
  WISHLIST_REMOVE_REQUEST,
  WISHLIST_REMOVE_SUCCESS,
  WISHLIST_REMOVE_FAILURE
} from 'r/actions/WishlistStateActions';
import { merge, set, setIn, getIn } from 'timm';
import { reduce } from 'lodash';

const initialState = {  
};

export function initWishlistStore(state, { response }) {
  return merge(state, {
    wishlist: response,
    isFetching: false,
    error: null,
  });
}

const actionMap = {
  [WISHLIST_REQUEST](state) {
    return merge(state, {
      isFetching: true,
      error: null,
    });
  },

  [WISHLIST_SUCCESS](state, action) {
    return initWishlistStore(state, action);
  },

  [WISHLIST_FAILURE](state, { error }) {
    return merge(state, {
      isFetching: false,
      error,
    });
  },
  [WISHLIST_ADD_REQUEST](state, { good_id }) {
    return set(state, good_id, {
      isFetching: true,
      error: null,
    });
  },
  [WISHLIST_ADD_SUCCESS](state, { good_id }) {
    return set(state, good_id, {
      isFetching: false,
      error: null,
      inWishList: true,
    });
  },
  [WISHLIST_ADD_FAILURE](state, { error, good_id }) {
    return set(state, good_id, {
      isFetching: false,
      error,
    });
  },
  [WISHLIST_REMOVE_REQUEST](state, { good_id }) {
    return set(state, good_id, {
      isFetching: true,
      error: null,
    });
  },
  [WISHLIST_REMOVE_SUCCESS](state, { good_id }) {
    return set(state, good_id, {
      isFetching: false,
      error: null,
      inWishList: null,
    });
  },
  [WISHLIST_REMOVE_FAILURE](state, { error, good_id }) {
    return set(state, good_id, {
      isFetching: false,
      error,
    });
  },
};

export default createReducer(initialState, actionMap);
