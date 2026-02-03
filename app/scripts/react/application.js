import {
  applyMiddleware,
  createStore,
  combineReducers,
  compose
} from 'redux';
import * as reducers from './reducers';
import apiMiddleware from './middleware/api';
import thunkMiddleware from 'redux-thunk';

/**
 * Получить gon объект SSR-safe способом
 */
function getGon() {
  if (typeof window !== 'undefined' && window.gon) {
    return window.gon;
  }
  if (typeof global !== 'undefined' && global.gon) {
    return global.gon;
  }
  return null;
}

// Bootstraping serverside data
let data = {};
const gon = getGon();
if (gon && gon.__data) {
  const { design } = gon.__data;

  data = {
    design: {
      current: design,
      currentSaved: design,
      unsavedFields: {},
      isSaving: false,
    },
  };
}

global.Kiosk = {
  version: '0.1.109',
};

// Unless we have no one common component, we will be pass <Provider /> global redux
// instance
global.redux = (compose(
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware
  ),
  global.devToolsExtension ? global.devToolsExtension() : (f) => f
)(createStore))(combineReducers(reducers), data);
