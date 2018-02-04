import { PropTypes } from 'react';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
});
