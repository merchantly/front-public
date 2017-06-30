import { wishlistItems, wishlistShow } from 'scripts/routes/api';
import { CALL_API } from 'r/middleware/api';
import { each } from 'lodash';

export const WISHLIST_ADD_REQUEST = 'WISHLIST_ADD_REQUEST';
export const WISHLIST_ADD_SUCCESS = 'WISHLIST_ADD_SUCCESS';
export const WISHLIST_ADD_FAILURE = 'WISHLIST_ADD_FAILURE';

export const WISHLIST_REMOVE_REQUEST = 'WISHLIST_REMOVE_REQUEST';
export const WISHLIST_REMOVE_SUCCESS = 'WISHLIST_REMOVE_SUCCESS';
export const WISHLIST_REMOVE_FAILURE = 'WISHLIST_REMOVE_FAILURE';

export const WISHLIST_REQUEST = 'WISHLIST_REQUEST';
export const WISHLIST_SUCCESS = 'WISHLIST_SUCCESS';
export const WISHLIST_FAILURE = 'WISHLIST_FAILURE';


export function wishlistCall(productId, method) {
  var types;
  if (method === "post") {
    types = [
      WISHLIST_ADD_REQUEST,
      WISHLIST_ADD_SUCCESS,
      WISHLIST_ADD_FAILURE,
    ];
  }
  if (method === "delete") {
    types = [
      WISHLIST_REMOVE_REQUEST,
      WISHLIST_REMOVE_SUCCESS,
      WISHLIST_REMOVE_FAILURE,
    ];
  }
  return {
    [CALL_API]: {
      endpoint: wishlistItems(),
      types: types,
      data: {
        dataType: 'json',
        method: method,
        data: {
          'good_id': productId         
        },
      },
    },
    good_id: productId,
  };
}

export function fetchWishlist() {
  return (dispatch, getState) => {
    const isFetching = getState().wishlist.isFetching;

    if (isFetching) {
      return null;
    }

    return dispatch({
      [CALL_API]: {
        endpoint: wishlistShow(),
        types: [
          WISHLIST_REQUEST,
          WISHLIST_SUCCESS,
          WISHLIST_FAILURE,
        ],
      },
    });
  };
}
