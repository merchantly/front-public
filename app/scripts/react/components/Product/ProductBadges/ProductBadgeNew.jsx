import React, { Component, PropTypes } from 'react';
import ProductBadge from './ProductBadge';

const ProductBadgeNew = ({ product, t }) => (
  product.isLabelNew
    ? <ProductBadge text={t('vendor.badges.new')} status="sold" />
    : <span />
);

ProductBadgeNew.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductBadgeNew;
