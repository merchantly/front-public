import { PropTypes } from 'prop-types';
import money from './money';
import checkoutField from './checkoutField';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  price: money,
  fields: PropTypes.arrayOf(checkoutField).isRequired,
  requiredFields: PropTypes.arrayOf(PropTypes.string),
  availablePayments: PropTypes.arrayOf(PropTypes.number),
  freeDeliveryThreshold: money
});
