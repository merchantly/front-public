import { PropTypes } from 'prop-types';

const {
  shape,
  string,
} = PropTypes;

export default shape({
  body: string.isRequired,
  author: string,
  createdAt: string.isRequired,
});
