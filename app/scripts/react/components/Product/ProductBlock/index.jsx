import React, { PropTypes } from 'react';
import provideTranslations from '../../HoC/provideTranslations';
import ProductBlockImage from './ProductBlockImage';
import ProductBlockBadges from './ProductBlockBadges';
import ProductPrices from '../ProductPrices';
import ProductBlockCartFormButton from '../ProductBlockCartForm/ProductBlockCartFormButton';

const ProductBlock = ({ showCartButton, showQuantity, product, t }) => (
  <div className="b-item-list__item">
    <div className="b-item">
      <a className="b-item__pic-wrap" href={product.publicUrl}>
        <ProductBlockImage product={product} />
        <ProductBlockBadges product={product} t={t} />
      </a>
      <a className="b-item__info" href={product.publicUrl}>
        <h3 className="b-item__name">
          {product.title}
        </h3>
        {Boolean(product.shortDetails) &&
          <div className="b-item__details">
            {product.shortDetails}
          </div>
        }
        <ProductPrices product={product} t={t} />
      </a>
      {(showCartButton && product.hasOrderingGoods && product.goods.length > 0) && (
        <div className="b-item__cart-form">
          <ProductBlockCartFormButton
            product={product}
            showQuantity={showQuantity}
            t={t}
          />
        </div>
      )}
    </div>
  </div>
);

ProductBlock.propTypes = {
  product: PropTypes.object.isRequired,
  showCartButton: PropTypes.bool,
  showQuantity: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

ProductBlock.defaultProps = {
  showCartButton: false,
  showQuantity: false,
};

export default provideTranslations(ProductBlock);
