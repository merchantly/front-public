import createReducer from 'r/utils/createReducer';
import {
  LAYOUT_REQUEST,
  LAYOUT_SUCCESS,
  LAYOUT_FAILURE,
} from 'r/actions/LayoutActions';

const initialState = {};

const actionMap = {
  [LAYOUT_SUCCESS](state, { response }) {
    return response;
  },
};

export default createReducer(initialState, actionMap);
