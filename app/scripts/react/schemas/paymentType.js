import { PropTypes } from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  paymentDiscounts: PropTypes.arrayOf(PropTypes.object),
  isGeideaPayment: PropTypes.bool,
  isEInvoice: PropTypes.bool,
});
