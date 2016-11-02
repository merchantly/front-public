import {
  operatorState,
} from 'scripts/routes/api';
import {
  CALL_API,
} from 'r/middleware/api';
import queryString from 'query-string';
import { canUseDOM } from 'r/helpers/dom';

export const OPERATOR_STATE_REQUEST = 'OPERATOR_STATE_REQUEST';
export const OPERATOR_STATE_SUCCESS = 'OPERATOR_STATE_SUCCESS';
export const OPERATOR_STATE_FAILURE = 'OPERATOR_STATE_FAILURE';

let operatorStatePromise;

export function fetchOperatorState(force) {
  return (dispatch, getState) => {
    if (!canUseDOM()) {
      return Promise.resolve(dispatch({
        response: {},
        type: null,
      }));
    }

    const state = getState().operatorState;
    const { design } = queryString.parse(window.location.search) || {};

    if (state.notAsked || force) {
      return (operatorStatePromise = Promise.resolve(dispatch({
        [CALL_API]: {
          endpoint: operatorState(),
          types: [
            OPERATOR_STATE_REQUEST,
            OPERATOR_STATE_SUCCESS,
            OPERATOR_STATE_FAILURE,
          ],
          data: {
            data: {
              design,
            },
            xhrFields: {
              withCredentials: true,
            },
            suppressError: true,
          },
        },
      })));
    } else if (operatorStatePromise) {
      return operatorStatePromise;
    } else {
      return Promise.resolve({
        response: state.data,
      });
    }
  };
}
