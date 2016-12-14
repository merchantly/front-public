import { PropTypes } from 'react';
import good from './good';
import money from './money';

const {
  shape,
  string,
  number,
} = PropTypes;

export default shape({
  count: number.isRequired,
  title: string.isRequired,
  totalPrice: money.isRequired,
  quantityUnit: shape({
    short: string.isRequired,
  }).isRequired,
  imageUrl: string.isRequired,
  good: good.isRequired,
});
