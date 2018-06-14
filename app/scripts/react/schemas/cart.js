import { PropTypes } from 'prop-types';
import money from './money';

export default PropTypes.shape({
  totalCount: PropTypes.number,
  totalPrice: money,
});
