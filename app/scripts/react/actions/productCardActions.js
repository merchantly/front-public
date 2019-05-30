import reqwest from 'reqwest';
import { productCards } from '../../routes/api';

export function load(productId) {
  return reqwest({
    url: productCards(productId),
    type: 'json',
  });
}
