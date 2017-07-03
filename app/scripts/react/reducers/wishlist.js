import createReducer from 'r/utils/createReducer';
import {
  WISHLIST_ADD_REQUEST,
  WISHLIST_ADD_SUCCESS,
  WISHLIST_ADD_FAILURE,
  WISHLIST_REMOVE_REQUEST,
  WISHLIST_REMOVE_SUCCESS,
  WISHLIST_REMOVE_FAILURE,
  WISHLIST_BUTTON_ADD_TO_WISH_LIST,
  WISHLIST_BUTTON_REMOVE_FROM_WISH_LIST,
  WISHLIST_BUTTON_FETCHING,
} from 'r/actions/WishlistStateActions';
import { merge, set, setIn, getIn } from 'timm';
import { reduce } from 'lodash';

const initialState = {  
};

const actionMap = { 
  [WISHLIST_ADD_REQUEST](state, { good_id }) {
    return set(state, 'data', {
      isFetching: true,
      buttonState: WISHLIST_BUTTON_FETCHING,
      globalId: good_id,
      error: null,
    });
  },
  [WISHLIST_ADD_SUCCESS](state, { good_id }) {
    return set(state, 'data', {
      isFetching: false,
      error: null,
      buttonState: WISHLIST_BUTTON_REMOVE_FROM_WISH_LIST,
      globalId: good_id,
      inWishList: true,
    });
  },
  [WISHLIST_ADD_FAILURE](state, { error, good_id }) {
    return set(state, 'data', {
      isFetching: false,
      buttonState: null,
      globalId: good_id,
      error,
    });
  },
  [WISHLIST_REMOVE_REQUEST](state, { good_id }) {
    return set(state, 'data', {
      isFetching: true,
      buttonState: WISHLIST_BUTTON_FETCHING,
      globalId: good_id,
      error: null,
    });
  },
  [WISHLIST_REMOVE_SUCCESS](state, { good_id }) {
    return set(state, 'data', {
      isFetching: false,
      buttonState: WISHLIST_BUTTON_ADD_TO_WISH_LIST,
      error: null,
      globalId: good_id,
      inWishList: false,
    });
  },
  [WISHLIST_REMOVE_FAILURE](state, { error, good_id }) {
    return set(state, 'data', {
      isFetching: false,
      buttonState: null,
      globalId: good_id,
      error,
    });
  },
};

export default createReducer(initialState, actionMap);
