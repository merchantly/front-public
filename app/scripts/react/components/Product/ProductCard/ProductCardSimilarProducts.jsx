import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as schemas from '../../../schemas';

import ProductBlock from '../ProductBlock';

const ProductCardSimilarProducts = ({ products, t, showCartButton }) => (
  products && products.length
    ? <section className="b-item-list b-item-list_additional">
        <div className="b-item-list__title">
          {t('vendor.similar_product.title')}
        </div>
        <div className="b-item-list__content">
          {products.map(product =>
            <ProductBlock key={product.id} product={product} t={t} showCartButton={showCartButton} />)}
        </div>
      </section>
    : <span />
);

ProductCardSimilarProducts.propTypes = {
  products: PropTypes.arrayOf(schemas.product),
  showCartButton: PropTypes.bool,
};

ProductCardSimilarProducts.defaultProps = {
  products: [],
  showCartButton: false
};

export default ProductCardSimilarProducts;
