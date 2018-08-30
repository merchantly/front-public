import { PropTypes } from 'prop-types';
import { ALL } from './checkoutFieldTypes';

export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(ALL),
  value: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
});
