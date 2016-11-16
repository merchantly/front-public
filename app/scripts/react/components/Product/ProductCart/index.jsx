import React, { Component, PropTypes } from 'react';
import { vendorCartItems } from '../../../../routes/app';
import CSRFToken from '../../common/CSRFToken';
import HiddenInput from '../../common/HiddenInput';
import ProductCartForProduct from './ProductCartForProduct';
import ProductCartForProductItems from './ProductCartForProductItems';
import ProductCartNotAvailable from './ProductCartNotAvailable';
import ProductBulk from '../ProductBulk';

export default class ProductCart extends Component {
  static propTypes = {
    amount: PropTypes.number,
    addWishlistUrl: PropTypes.string,
    formAuthenticity: PropTypes.object,
    good: PropTypes.object,
    hasWishlist: PropTypes.bool,
    isAddingGood: PropTypes.bool.isRequired,
    isWishlisted: PropTypes.bool,
    onChangeAmount: PropTypes.func.isRequired,
    onGoodChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    wishlistUrl: PropTypes.string,
  }
  static defaultProps = {
    formAuthenticity: {},
  }
  renderContent() {
    const {
      product,
      t,
    } = this.props;

    if (product.has_ordering_goods) {
      if (product.goods.length === 1) {
        return (
          <ProductCartForProduct
            {...this.props}
            good={product.goods[0]}
            t={t}
          />
        );
      } else {
        return (
          <ProductCartForProductItems {...this.props} t={t} />
        );
      }
    } else {
      return (
        <ProductCartNotAvailable {...this.props} t={t} />
      );
    }
  }
  renderProductBulkInput(){
    const {
      amount,
      onChangeAmount,
      product,
      good,
      t,
    } = this.props;

    if (product.selling_by_weight && product.weight_of_price) {
      return (
        <div className="b-item-full__form__row b-item-full__form__row_fixed">
          <div className="b-item-full__weight">
            <ProductBulk {...{
              amount,
              good,
              onChangeAmount,
              product,
              t,
            }} />
          </div>
        </div>
      );
    }
  }
  render() {
    const {
      formAuthenticity,
      onSubmit,
    } = this.props;

    return (
      <form
        acceptCharset="UTF-8"
        action={vendorCartItems()}
        className="simple_form cart_item"
        method="POST"
        onSubmit={onSubmit}
      >
        <div style={{ display: 'none'}}>
          <HiddenInput name="utf8" value="✓" />
          <CSRFToken {...formAuthenticity} />
        </div>
        {this.renderProductBulkInput()}
        {this.renderContent()}
      </form>
    );
  }
}
