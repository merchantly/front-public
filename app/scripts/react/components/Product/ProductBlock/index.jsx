import React, { PropTypes } from 'react';
import provideTranslations from '../../HoC/provideTranslations';
import ProductBlockImage from './ProductBlockImage';
import ProductBlockBadges from './ProductBlockBadges';
import ProductPrices from '../ProductPrices';
import ProductBlockCartFormButton from '../ProductBlockCartForm/ProductBlockCartFormButton';
import AppLink from 'rc/common/AppLink';
import { productRoute } from 'scripts/routes/app';

const ProductBlock = ({ showCartButton, showQuantity, product, t }) => (
  <div className="b-item-list__item">
    <div className="b-item">
      <AppLink
        className="b-item__pic-wrap"
        hash={productRoute(product.id)}
        href={product.public_url}
      >
        <ProductBlockImage product={product} />
        <ProductBlockBadges product={product} t={t} />
      </AppLink>
      <AppLink
        className="b-item__info"
        hash={productRoute(product.id)}
        href={product.public_url}
      >
        <h3 className="b-item__name">
          {product.title}
        </h3>
        {Boolean(product.short_details) &&
          <div className="b-item__details">
            {product.short_details}
          </div>
        }
        <ProductPrices product={product} t={t} />
      </AppLink>
      {(showCartButton && product.has_ordering_goods && product.goods.length > 0) && (
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
