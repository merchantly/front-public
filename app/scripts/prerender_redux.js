import { createStore, combineReducers, applyMiddleware } from 'redux';

const thunk = require('redux-thunk').default;

const DesignReducer = require('./react/reducers/Design.prerender');
const PopupReducer = require('./react/reducers/popup');
const cartReducer = require('./react/reducers/cart').default;
const packagesReducer = require('./react/reducers/packages').default;
const goodStateReducer = require('./react/reducers/goodState');
const layoutReducer = require('./react/reducers/layout');
const clientState = require('./react/reducers/clientState');
const operatorState = require('./react/reducers/operatorState');

var prerenderReducers = combineReducers({
  cart: cartReducer,
  goodState: goodStateReducer,
  packages: packagesReducer,
  design: DesignReducer,
  popup: PopupReducer,
  clientState: clientState,
  operatorState: operatorState,
  widget: layoutReducer,
});

export default (applyMiddleware(thunk)(createStore))(prerenderReducers, {});
