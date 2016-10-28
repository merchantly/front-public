/*global $ */
import { camelizeKeys } from 'humps';
import NoticeService from '../services/Notice';

export const CALL_API = Symbol('Call API');

function callApi(endpoint, data) {
  return $.ajax(endpoint, data)
    .then((data, status, jqXHR) => {
      let json = jqXHR.responseJSON;

      if (typeof json !== 'object') {
        json = {};
      }

      return camelizeKeys(json);
    }, (jqHXR) => {
      let json = jqHXR.responseJSON;

      if (!(data && data.suppressError)) {
        NoticeService.errorResponse(jqHXR);
      }

      if (typeof json !== 'object') {
        json = {};
      }

      return camelizeKeys(json);
    });
}

export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return (next(action));
  }

  let { endpoint, data } = callAPI;
  const { types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL');
  }

  if (typeof opts === 'function') {
    data = data(store.getState());
  }

  if (typeof data !== 'undefined' &&
    typeof data !== 'object') {
    throw new Error('Expected data to be an object');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types');
  }

  if (!types.every((type) => typeof type === 'string')) {
    throw new Error('Expected action types to be strings');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, data)
    .then(
      (response) => next(actionWith({
        response,
        type: successType,
      })),
      (error) => Promise.reject(next(actionWith({
        error,
        type: failureType,
      })))
    );
};
