import { productCards } from '../../routes/api';
import reqwest from 'reqwest';

export function load(productId) {
  return reqwest({
    url: productCards(productId),
    type: 'json',
  });
}
