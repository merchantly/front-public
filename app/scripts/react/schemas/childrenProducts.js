import { PropTypes } from 'prop-types';
import product from './product';

const {
  arrayOf,
  shape,
  string,
} = PropTypes;

export default arrayOf(shape({
  products: arrayOf(product).isRequired,
  title: string,
}));
