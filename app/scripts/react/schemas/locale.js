import { PropTypes } from 'prop-types';

export default PropTypes.shape({
  lang: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});
