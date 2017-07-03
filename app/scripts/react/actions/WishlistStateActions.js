import { wishlistItems, wishlistShow } from 'scripts/routes/api';
import { CALL_API } from 'r/middleware/api';
import { each } from 'lodash';

export const WISHLIST_ADD_REQUEST = 'WISHLIST_ADD_REQUEST';
export const WISHLIST_ADD_SUCCESS = 'WISHLIST_ADD_SUCCESS';
export const WISHLIST_ADD_FAILURE = 'WISHLIST_ADD_FAILURE';

export const WISHLIST_REMOVE_REQUEST = 'WISHLIST_REMOVE_REQUEST';
export const WISHLIST_REMOVE_SUCCESS = 'WISHLIST_REMOVE_SUCCESS';
export const WISHLIST_REMOVE_FAILURE = 'WISHLIST_REMOVE_FAILURE';

// Wishlist button states
export const WISHLIST_BUTTON_ADD_TO_WISH_LIST = 'WISHLIST_BUTTON_ADD_TO_WISH_LIST';
export const WISHLIST_BUTTON_REMOVE_FROM_WISH_LIST = 'WISHLIST_BUTTON_REMOVE_FROM_WISH_LIST';
export const WISHLIST_BUTTON_FETCHING = 'WISHLIST_BUTTON_FETCHING';

export function wishlistCall(globalId, method) {
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
          'good_id': globalId         
        },
      },
    },
    good_id: globalId,
  };
}
