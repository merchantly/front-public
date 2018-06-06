import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductBadge from './ProductBadge';

const ProductBadgeNew = ({ product, t }) => (
  product.isLabelNew
    ? <ProductBadge text={t('vendor.badges.new')} status="new" />
    : <span />
);

ProductBadgeNew.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductBadgeNew;
