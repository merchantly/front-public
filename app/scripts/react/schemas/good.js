import { PropTypes } from 'react';
import money from './money';
import image from './image';

/**
 * addToCartUrl - урл для добавления товара в корзину. используется в WishlistAddToCartButton
 * defaultUrl - урл для перехода на страницу товара
 * customAttributes - описание товара в виде {'имя характеристики': 'характеристика'}
 */

export default PropTypes.shape({
  globalId: PropTypes.string,
  customAttributes: PropTypes.object,
  isSale: PropTypes.bool.isRequired,
  image: image,
  price: money,
  actualPrice: money,
  addToCartUrl: PropTypes.string,
  defaultUrl: PropTypes.string,
  sellingByWeight: PropTypes.bool,
  weightOfPrice: PropTypes.number,
});
