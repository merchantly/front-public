import { productCards } from '../../routes/api';
// import reqwest from 'reqwest';

export function load(productId) {
  const reqwest = require('reqwest');

  return reqwest({
    url: productCards(productId),
    type: 'json',
  });
}
