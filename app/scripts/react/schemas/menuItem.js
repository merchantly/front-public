import { PropTypes } from 'prop-types';

const menuItem = PropTypes.shape({
  children: PropTypes.arrayOf(lazyMenuItem).isRequired,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  url: PropTypes.string,
  productsCount: PropTypes.number,
  linkTarget: PropTypes.string,
});

function lazyMenuItem() {
  return menuItem.apply(null, arguments);
}

export default menuItem;
