import {
  userState,
} from 'scripts/routes/api';
import {
  CALL_API,
} from 'r/middleware/api';
import queryString from 'query-string';
import { canUseDOM } from 'r/helpers/dom';

export const USER_STATE_REQUEST = 'USER_STATE_REQUEST';
export const USER_STATE_SUCCESS = 'USER_STATE_SUCCESS';
export const USER_STATE_FAILURE = 'USER_STATE_FAILURE';

let userStatePromise;

export function fetchUserState(force) {
  return (dispatch, getState) => {
    if (!canUseDOM()) {
      return Promise.resolve(dispatch({
        response: {},
        type: null,
      }));
    }

    const state = getState().userState;
    const { design } = queryString.parse(window.location.search) || {};

    if (state.notAsked || force) {
      return (userStatePromise = Promise.resolve(dispatch({
        [CALL_API]: {
          endpoint: userState(),
          types: [
            USER_STATE_REQUEST,
            USER_STATE_SUCCESS,
            USER_STATE_FAILURE,
          ],
          data: { design },
        },
      })));
    } else if (userStatePromise) {
      return userStatePromise;
    } else {
      return Promise.resolve({
        response: state.data,
      });
    }
  };
}
