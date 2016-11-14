import BasketDispatcher from '../../stores/BasketDispatcher';
import * as apiRoutes from '../../../routes/api';
import $ from 'jquery';

function startItemRequest(id) {
  return BasketDispatcher.handleServerAction({
    actionType: 'startItemRequest',
    id
  });
}

function stopItemRequest(id) {
  return BasketDispatcher.handleServerAction({actionType: 'stopItemRequest', id});
}

function errorItemRequest(id, error) {
  return BasketDispatcher.handleServerAction({
    actionType: 'errorItemRequest',
    id,
    error
  });
}

export function updateBasketState(cartItems) {
  return BasketDispatcher.handleViewAction({
    actionType: 'updateBasketState',
    cartItems
  });
}

export function addGood(good, count = 1, weight = null) {
  startItemRequest(good.id);

  return $.ajax({
    dataType: 'json',
    method: 'post',
    data: {
      'cart_item[good_id]': good.global_id,
      count,
      weight
    },
    url: apiRoutes.cartItems(),
  }).done((response) => {
    const basket = response;

    return BasketDispatcher.handleServerAction({
      actionType: 'updateBasketState',
      basket
    });
  }).fail((response) => {
    errorItemRequest(good.id, response.responseJSON)
  }).always(() => {
    stopItemRequest(good.id);
  });
}

export function initBasketState() {
  return $.ajax({
    dataType: 'json',
    method: 'get',
    url: apiRoutes.cartsShow(),
  }).done((response) => {
    const basket = response;

    return BasketDispatcher.handleServerAction({
      actionType: 'updateBasketState',
      basket
    });
  });
}
