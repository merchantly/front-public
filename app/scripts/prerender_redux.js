import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import DesignReducer from './react/reducers/Design.prerender';
import PopupReducer from './react/reducers/popup';
import cartReducer from './react/reducers/cart';
import packagesReducer from './react/reducers/packages';
import goodStateReducer from './react/reducers/goodState';
import layoutReducer from './react/reducers/layout';
import clientState from './react/reducers/clientState';
import operatorState from './react/reducers/operatorState';

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
