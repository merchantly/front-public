import createReducer from 'r/utils/createReducer';
import {
  USER_STATE_REQUEST,
  USER_STATE_SUCCESS,
  USER_STATE_FAILURE,
} from 'r/actions/UserStateActions';

const initialState = {
  data: {
    isCurrentClientPresent: false,
  },
  notAsked: true,
  isFetching: false,
  error: null,
};

const actionMap = {
  [USER_STATE_REQUEST](state) {
    return Object.assign({}, state, {
      notAsked: false,
      isFetching: true,
      error: null,
    });
  },

  [USER_STATE_SUCCESS](state, { response }) {
    return Object.assign({}, state, {
      data: Object.assign({}, state.data, response),
      isFetching: false,
      error: null,
    });
  },

  [USER_STATE_FAILURE](state, { error }) {
    return Object.assign({}, state, {
      isFetching: false,
      error,
    });
  },
};

export default createReducer(initialState, actionMap);
