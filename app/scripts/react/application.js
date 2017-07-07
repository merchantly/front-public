import {
  applyMiddleware,
  createStore,
  combineReducers,
  compose,
} from 'redux';
import * as reducers from './reducers';
import apiMiddleware from './middleware/api';
import thunkMiddleware from 'redux-thunk';

// Bootstraping serverside data
let data = {};
if (global.gon.__data) {
  const { design } = global.gon.__data;

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
  version: '0.0.766',
};

// Unless we have no one common component, we will be pass <Provider /> global redux
// instance
global.redux = (compose(
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
  ),
  global.devToolsExtension ? global.devToolsExtension() : (f) => f
)(createStore))(combineReducers(reducers), data);
