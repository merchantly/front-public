import createReducer from 'r/utils/createReducer';
import {
  GOOD_ADD_REQUEST,
  GOOD_ADD_SUCCESS,
  GOOD_ADD_FAILURE,
  GOOD_STATE_RESET,
} from 'r/actions/GoodStateActions';
import { set } from 'timm';

const initialState = {};

const actionMap = {
  [GOOD_STATE_RESET](state, { goodId }) {
    return set(state, goodId, void 0);
  },
  [GOOD_ADD_REQUEST](state, { goodId }) {
    return set(state, goodId, {
      isFetching: true,
      error: null,
    });
  },
  [GOOD_ADD_SUCCESS](state, { goodId }) {
    return set(state, goodId, {
      isFetching: false,
      error: null,
    });
  },
  [GOOD_ADD_FAILURE](state, { error, goodId }) {
    return set(state, goodId, {
      isFetching: false,
      error,
    });
  },
};

export default createReducer(initialState, actionMap);
