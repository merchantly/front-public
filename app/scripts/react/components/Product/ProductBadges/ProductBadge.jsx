import React, { PropTypes } from 'react';
import classNames from 'classnames';

const ProductBadge = ({ status, text }) => (
  <span className={classNames('b-status', [].concat(...[status]).map((status_entity) => `b-status_${status_entity}`))}>
    {text}
  </span>
);

ProductBadge.propTypes = {
  status: PropTypes.oneOfType([    
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  text: PropTypes.string.isRequired,
};

export default ProductBadge;
