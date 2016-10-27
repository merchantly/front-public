import createReducer from 'r/utils/createReducer';
import {
  OPERATOR_STATE_REQUEST,
  OPERATOR_STATE_SUCCESS,
  OPERATOR_STATE_FAILURE,
} from 'r/actions/OperatorStateActions';

const initialState = {
  data: {},
  notAsked: true,
  isFetching: false,
  error: null,
};

const actionMap = {
  [OPERATOR_STATE_REQUEST](state) {
    return Object.assign({}, state, {
      notAsked: false,
      isFetching: true,
      error: null,
    });
  },

  [OPERATOR_STATE_SUCCESS](state, { response }) {
    return Object.assign({}, state, {
      data: Object.assign({}, state.data, response),
      isFetching: false,
      error: null,
    });
  },

  [OPERATOR_STATE_FAILURE](state, { error }) {
    return Object.assign({}, state, {
      isFetching: false,
      error,
    });
  },
};

export default createReducer(initialState, actionMap);
