import {
  clientState,
} from 'scripts/routes/api';
import {
  CALL_API,
} from 'r/middleware/api';
import { canUseDOM } from 'r/helpers/dom';

export const CLIENT_STATE_REQUEST = 'CLIENT_STATE_REQUEST';
export const CLIENT_STATE_SUCCESS = 'CLIENT_STATE_SUCCESS';
export const CLIENT_STATE_FAILURE = 'CLIENT_STATE_FAILURE';

let clientStatePromise;

export function fetchClientState(force) {
  return (dispatch, getState) => {
    if (!canUseDOM()) {
      return Promise.resolve(dispatch({
        response: {},
        type: null,
      }));
    }

    const state = getState().clientState;

    if (state.notAsked || force) {
      return (clientStatePromise = Promise.resolve(dispatch({
        [CALL_API]: {
          endpoint: clientState(),
          types: [
            CLIENT_STATE_REQUEST,
            CLIENT_STATE_SUCCESS,
            CLIENT_STATE_FAILURE,
          ],
        },
      })));
    } else if (clientStatePromise) {
      return clientStatePromise;
    } else {
      return Promise.resolve({
        response: state.data,
      });
    }
  };
}
