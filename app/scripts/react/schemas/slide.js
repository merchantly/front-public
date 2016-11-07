import { PropTypes } from 'react';
import image from './image';

export default PropTypes.shape({
  image,
  url: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.string.isRequired
});
