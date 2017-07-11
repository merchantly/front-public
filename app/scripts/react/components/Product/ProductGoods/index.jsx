import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

import { goodOrderTitle } from '../../../helpers/product';

import ProductAddToCartButton from '../ProductAddToCartButton';
import ProductCartWishlist from '../ProductCart/ProductCartWishlist';

class ProductGoods extends Component {
  static propTypes = {
    addWishlistUrl: PropTypes.string,
    isAddingGood: PropTypes.bool.isRequired,
    hasWishlist: PropTypes.bool,
    onGoodChange: PropTypes.func,
    product: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,    
  }
  componentDidMount() {
    const { product, onGoodChange } = this.props;

    for (let i = 0; i < product.goods.length; i++) {
      const good = product.goods[i];

      if (good.isOrdering) {
        if (onGoodChange) onGoodChange(good);
        break;
      }
    }
  }
  isTitlesValid(product, maxLength = 30) {
    return !product.goods.some((el) =>
      goodOrderTitle(product, el).length > maxLength
    );
  }
  handleSelectChange(e) {
    const value = e.target.value;
    const { onGoodChange, product: { goods } } = this.props;

    for (let i = 0; i < goods.length; i++) {
      const good = goods[i];

      if (good.globalId === value) {
        if (onGoodChange) onGoodChange(good);
        break;
      }
    }
  }
  renderOption(good, product) {
    return (
      <option
        disabled={!good.isOrdering}
        key={good.globalId}
        value={good.globalId}
      >
        {goodOrderTitle(product, good)}
      </option>
    );
  }
  renderSelect(product) {
    let selectedValue;

    for (let i = 0; i < product.goods.length; i++) {
      const good = product.goods[i];

      if (good.isOrdering) {
        selectedValue = good.globalId;
        break;
      }
    }

    return (
      <select
        defaultValue={selectedValue}
        name="cart_item[good_id]"
        onChange={this.handleSelectChange.bind(this)}
      >
        {product.goods.map((good) => this.renderOption(good, product))}
      </select>
    );
  }
  render() {
    const {
      isAddingGood,
      product,
      t,
      hasWishlist,
    } = this.props;

    if (this.isTitlesValid(product)) {
      return (
        <span>
          <div className="b-item-full__form__row b-item-full__form__row_fixed">
            <div className="b-item-full__form__option">
              {this.renderSelect(product)}
            </div>
            <div className="b-item-full__form__submit">
              <ProductAddToCartButton
                isAddingGood={isAddingGood}
                t={t}
                text={t('vendor.button.to_cart', {title: product.title})}
              />
            </div>
          </div>
          <ProductCartWishlist t={t} product={product} />
        </span>
      );
    } else {
      return (
        <span>
          <div className="b-item-full__form__row">
            <div className="b-item-full__form__option b-item-full__form__option_full">
              {this.renderSelect(product)}
            </div>
            <ProductCartWishlist t={t} product={product} />
          </div>
          <div className="b-item-full__form__row b-item-full__form__submit">
            <ProductAddToCartButton
              isAddingGood={isAddingGood}
              t={t}
              text={t('vendor.button.to_cart', {title: product.title})}
            />
          </div>
        </span>
      );
    }
  }
}

export default ProductGoods;
