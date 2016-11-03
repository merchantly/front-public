import { PropTypes } from 'react';
import money from './money';
import good from './good';

/**
 * Схема которую возвращает бэкенд /v1/carts/show.json
 *
 * Используется в компонентах: WishlistContainer, CartContainer
 *
 * totalCount - кол-во позиций в корзине (WishlistContainer)
 * totalPrice - полная цена корзины без учета доставки (WishlistContainer)
 * defaultUrl - урл для сабмита/очистки корзины (CartContainer)
 */

export default PropTypes.shape({
  totalCount: PropTypes.number,
  totalPrice: money.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    good: good.isRequired,
    destroyPath: PropTypes.string.isRequired,
    count: PropTypes.number,
    weight: PropTypes.number,
  })).isRequired,
  packageItem: PropTypes.shape({
    good: good.isRequired,
    destroyUrl: PropTypes.string.isRequired,
  }),
  couponCode: PropTypes.string,
  errors: PropTypes.object.isRequired,
  defaultUrl: PropTypes.string.isRequired,
});
