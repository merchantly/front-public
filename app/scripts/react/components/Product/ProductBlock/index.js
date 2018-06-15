import React, { Component } from 'react';
import PropTypes from 'prop-types';
import provideTranslations from '../../HoC/provideTranslations';
import ProductBlockImage from './ProductBlockImage';
import ProductBlockBadges from './ProductBlockBadges';
import ProductPrices from '../ProductPrices';
import ProductBlockCartFormButton from '../ProductBlockCartForm/ProductBlockCartFormButton';
import AppLink from 'rc/common/AppLink';
import { productRoute } from 'scripts/routes/app';

class ProductBlock extends Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      isHover: false,
    };
  }
  handleMouseEnter() {
    this.setState({ isHover: true });
  }
  handleMouseLeave() {
    this.setState({ isHover: false });
  }
  render () {
    const { showCartButton, showQuantity, product, t } = this.props;
    const { isHover } = this.state;

    return (
      <div className="b-item-list__item"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        >
        <div className="b-item">
          <AppLink
            className="b-item__pic-wrap"
            hash={productRoute(product.id)}
            href={product.publicUrl}
          >
            <ProductBlockImage product={product} containerIsHover={isHover}/>
            <ProductBlockBadges product={product} t={t} />
          </AppLink>
          <AppLink
            className="b-item__info"
            hash={productRoute(product.id)}
            href={product.publicUrl}
          >
            <div className="b-item__name">
              {product.title}
            </div>
            {Boolean(product.shortDetails) &&
              <div className="b-item__details">
                {product.shortDetails}
              </div>
            }
            <ProductPrices product={product} t={t} />
          </AppLink>
          {(showCartButton && product.hasOrderingGoods) && (
            <div className="b-item__cart-form">
              {(product.goods.length === 1) && (
                <ProductBlockCartFormButton
                  product={product}
                  showQuantity={showQuantity}
                  t={t}
                />
              )}
              {(product.goods.length > 1) && (
                <AppLink
                  className="b-btn element--active"
                  hash={productRoute(product.id)}
                  href={product.publicUrl}
                >
                  {t('vendor.more')}
                </AppLink>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

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
