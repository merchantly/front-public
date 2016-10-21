import * as reducers from 'r/reducers';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from 'r/middleware/api';
import {
  applyMiddleware,
  createStore,
  combineReducers,
} from 'redux';

global.redux = (applyMiddleware(
  thunkMiddleware,
  apiMiddleware
)(createStore))(combineReducers(reducers));
