import { packages } from '../../routes/api';
import { CALL_API } from '../middleware/api';
import { camelizeKeys } from 'humps';

export const PACKAGES_REQUEST = 'PACKAGES_REQUEST';
export const PACKAGES_SUCCESS = 'PACKAGES_SUCCESS';
export const PACKAGES_FAILURE = 'PACKAGES_FAILURE';

export function initPackages(initialPackages) {
  return {
    type: PACKAGES_SUCCESS,
    response: camelizeKeys(initialPackages),
  };
}

export function fetchPackages() {
  return (dispatch, getState) => {
    const isFetching = getState().packages.isFetching;

    if (isFetching) {
      return null;
    }

    return dispatch({
      [CALL_API]: {
        endpoint: packages(),
        types: [
          PACKAGES_REQUEST,
          PACKAGES_SUCCESS,
          PACKAGES_FAILURE,
        ],
      },
    });
  };
}
