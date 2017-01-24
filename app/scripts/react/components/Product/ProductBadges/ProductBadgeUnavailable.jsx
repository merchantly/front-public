import React, { PropTypes } from 'react';
import ProductBadge from './ProductBadge';

const ProductBadgeUnavailable = ({ product, t }) => (
  !product.hasOrderingGoods && !product.isRunOut
    ? <ProductBadge status="unavailable" text={t('vendor.badges.not_available')} />
    : <span />
);

ProductBadgeUnavailable.propTypes = {
  product: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default ProductBadgeUnavailable;
