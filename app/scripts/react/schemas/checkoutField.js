import { PropTypes } from 'react';

export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['string', 'textarea', 'hidden', 'select']),
  value: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
});
