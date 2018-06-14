import { PropTypes } from 'prop-types';
import money from './money';
import image from './image';

/**
 * Схему возвращает бэкенд /v1/packages.json
 *
 * Используется в компоненте CartContainer
 */

export default PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  globalId: PropTypes.string.isRequired,
  hasOrderingGoods: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: money.isRequired,
  image: image.isRequired,
}));
