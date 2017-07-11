import React, { PropTypes } from 'react';

import ProductCartWishlist from './ProductCartWishlist';

const ProductCartNotAvailable = (props) => (
  <div className="b-item-full__form__row b-item-full__form__row_fixed">
    <div className="b-item-full__form__submit">
      <div className="b-btn b-btn_trans">
        {props.t('vendor.product.not_available')}
      </div>
    </div>
    <ProductCartWishlist t={props.t} product={props.product} />
  </div>
);

export default ProductCartNotAvailable;