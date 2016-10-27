import createReducer from 'r/utils/createReducer';
import {
  CLIENT_STATE_REQUEST,
  CLIENT_STATE_SUCCESS,
  CLIENT_STATE_FAILURE,
} from 'r/actions/ClientStateActions';

const initialState = {
  data: {},
  notAsked: true,
  isFetching: false,
  error: null,
};

const actionMap = {
  [CLIENT_STATE_REQUEST](state) {
    return Object.assign({}, state, {
      notAsked: false,
      isFetching: true,
      error: null,
    });
  },

  [CLIENT_STATE_SUCCESS](state, { response }) {
    return Object.assign({}, state, {
      data: Object.assign({}, state.data, response),
      isFetching: false,
      error: null,
    });
  },

  [CLIENT_STATE_FAILURE](state, { error }) {
    return Object.assign({}, state, {
      isFetching: false,
      error,
    });
  },
};

export default createReducer(initialState, actionMap);
