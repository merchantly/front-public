import { PropTypes } from 'prop-types';

export default PropTypes.shape({
  currentHref: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
});
