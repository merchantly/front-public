import { PropTypes } from 'prop-types';
import image from './image';

export default PropTypes.shape({
  image,
  url: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.string.isRequired
});
