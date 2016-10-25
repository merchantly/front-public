import createReducer from '../utils/createReducer';
import {
  PACKAGES_REQUEST,
  PACKAGES_SUCCESS,
  PACKAGES_FAILURE,
} from '../actions/PackagesActions';
import { merge } from 'timm';

const initialState = {
  packages: [],
  isFetching: false,
  error: null,
};

export function initPackageStore(state, { response }) {
  return merge(state, {
    packages: response,
    isFetching: false,
    error: null,
  });
}

const actionMap = {
  [PACKAGES_REQUEST](state) {
    return merge(state, {
      isFetching: true,
      error: null,
    });
  },

  [PACKAGES_SUCCESS](state, action) {
    return initPackageStore(state, action);
  },

  [PACKAGES_FAILURE](state, { error }) {
    return merge(state, {
      isFetching: false,
      error,
    });
  },
};

export default createReducer(initialState, actionMap);
