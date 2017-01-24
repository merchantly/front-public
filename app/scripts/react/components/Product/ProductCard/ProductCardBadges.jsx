import React, { Component, PropTypes } from 'react';

import ProductBadge from '../ProductBadges/ProductBadge';
import ProductBadgeNew from '../ProductBadges/ProductBadgeNew';
import ProductBadgeSale from '../ProductBadges/ProductBadgeSale';

const ProductCardBadges = ({ product, t }) => (
  <span>
    <ProductBadgeNew product={product} t={t} />
    <ProductBadgeSale product={product} t={t} />
    {product.tags && product.tags.map((tag) => <ProductBadge status={['tag', `tag-${tag.id}`]} text={tag.title} key={tag.id} />)}
  </span>
);

ProductCardBadges.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCardBadges;
