export function vendorCartItems() {
  return '/cart/items';
}

export function vendorOrder() {
  return '/orders';
}

export function productRoute(productId) {
  return `product/${productId}`;
}

export function categoryRoute(categoryId) {
  return `category/${categoryId}`;
}

export function dictionaryEntitiesRoute(entitiesId) {
  return `entities/${entitiesId}`;
}

export function cartRoute() {
  return 'cart';
}

export function checkoutRoute() {
  return 'checkout';
}
