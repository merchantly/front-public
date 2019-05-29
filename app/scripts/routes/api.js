export function publicUrl() {
  return (global.mrch) ? global.mrch.config.public_api_url : global.gon.public_api_url;
}

export function operatorUrl() {
  return (global.mrch) ? global.mrch.config.operator_api_url : global.gon.operator_api_url;
}

export function designSettings() {
  return operatorUrl() + '/v1/design_settings';
}

export function productsFilteredCount(filter) {
  return publicUrl() + '/v1/products/filtered/count?' + filter;
}

export function checkCouponCode() {
  return publicUrl() + '/v1/coupon/call';
}

export function productCards(id) {
  return `${publicUrl()}/v1/product_cards/${id}`;
}

export function instagram() {
  return `${publicUrl()}/v1/instagram/feed`;
}

export function cartItems() {
  return `${publicUrl()}/v1/cart_items`;
}

export function cartsShow() {
  return `${publicUrl()}/v1/carts/show.json`;
}

export function wishlistItems() {
  return `${publicUrl()}/v1/wishlist_items`;
}

export function wishlistShow() {
  return `${publicUrl()}/v1/wishlist/show.json`;
}

export function packages() {
  return `${publicUrl()}/v1/packages.json`;
}

export function clientState() {
  return `${publicUrl()}/v1/client_state.json`;
}

export function operatorState() {
  return `${operatorUrl()}/v1/operator_state.json`;
}

export function subscriptionEmails() {
  return `${publicUrl()}/v1/subscription_emails.json`;
}

export function pickupPoints() {
  return `${publicUrl()}/v1/pickup_points.json`;
}
