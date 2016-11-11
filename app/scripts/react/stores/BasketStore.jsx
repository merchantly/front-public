import BaseStore from './BaseStore';
import { extend } from 'lodash';

let _basket = {}
const _basketItemsState = {}

const BasketStore = extend(new BaseStore(), {
  getBasket() {
    return _basket;
  },
  updateBasketState(basket) {
    _basket = basket;
  },
  getCartItemState(cartItemId) {
    return _basketItemsState[cartItemId] || {};
  },
  startItemRequest(cartItemId) {
    (_basketItemsState[cartItemId] || (_basketItemsState[cartItemId] = {}))
    _basketItemsState[cartItemId].isRequestProcessing = true;
  },
  stopItemRequest(cartItemId) {
    (_basketItemsState[cartItemId] || (_basketItemsState[cartItemId] = {}))
    _basketItemsState[cartItemId].isRequestProcessing = false;
  },
  errorItemRequest(cartItemId, error) {
    (_basketItemsState[cartItemId] || (_basketItemsState[cartItemId] = {}))
    _basketItemsState[cartItemId].requestError = error;
  },
});

export default BasketStore;
