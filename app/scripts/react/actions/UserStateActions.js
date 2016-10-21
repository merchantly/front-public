import {
  userState,
} from 'scripts/routes/api';
import {
  CALL_API,
} from 'r/middleware/api';

export const USER_STATE_REQUEST = 'USER_STATE_REQUEST';
export const USER_STATE_SUCCESS = 'USER_STATE_SUCCESS';
export const USER_STATE_FAILURE = 'USER_STATE_FAILURE';

export function fetchUserState(force=false) {
  return (dispatch, getState) => {
    const state = getState().userState;

    return state.notAsked || force
      ? dispatch({
          [CALL_API]: {
            endpoint: userState(),
            types: [
              USER_STATE_REQUEST,
              USER_STATE_SUCCESS,
              USER_STATE_FAILURE,
            ],
          },
        })
      : Promise.resolve({ response: state.data });
  };
}
