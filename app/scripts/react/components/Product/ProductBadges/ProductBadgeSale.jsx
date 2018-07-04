import React from 'react';
import PropTypes from 'prop-types';
import ProductBadge from './ProductBadge';

const ProductBadgeSale = ({ product, t }) => {
  if (product.isSale) {
    let title = t('vendor.badges.sale');

    if (product.salePercent) {
      let salePercent = product.salePercent;

      if (parseInt(salePercent, 10) === salePercent) {
        salePercent = parseInt(salePercent, 10);
      }

      title = t('vendor.badges.sale_percent', { percent: salePercent });
    }

    return <ProductBadge text={title} status="sale" />;
  }

  return <span />;
};

ProductBadgeSale.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductBadgeSale;
