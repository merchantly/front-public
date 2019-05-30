import { productCards } from '../../routes/api';

export function load(productId) {
  const reqwest = require('reqwest');
  return reqwest({
    url: productCards(productId),
    type: 'json',
  });
}
