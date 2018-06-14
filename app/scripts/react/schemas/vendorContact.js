import { PropTypes } from 'prop-types';

export default PropTypes.shape({
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  link: PropTypes.string,
});
