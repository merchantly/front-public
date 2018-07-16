import React, { Component, PropTypes } from 'react';
import { vendorCartItems } from '../../../../routes/app';
import CSRFToken from '../../common/CSRFToken';
import HiddenInput from '../../common/HiddenInput';
import ProductCartForProduct from './ProductCartForProduct';
import ProductCartForProductItems from './ProductCartForProductItems';
import ProductCartMultipleChoice from './ProductCartMultipleChoice';
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
    multipleChoice: PropTypes.bool,
    notAvailableLinks: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ).isOptional,
  }
  static defaultProps = {
    formAuthenticity: {},
  }
  renderContent(product, t) {
    if (product.hasOrderingGoods) {
      if (product.goods.length === 1) {
        return (
          <ProductCartForProduct
            {...this.props}
            good={product.goods[0]}
            t={t}
          />
        );
      } else {
        if (this.props.multipleChoice) {
          return (
            <ProductCartMultipleChoice isAddingGood={this.props.isAddingGood} productGlobalId={product.globalId} goods={product.goods} properties={product.properties} t={t} />
          );
        } else {
          return (
            <ProductCartForProductItems {...this.props} t={t} />
          );
        }
      }
    } else {
      return (
        <ProductCartNotAvailable {...this.props} t={t} />
      );
    }
  }
  renderProductBulkInput(product, good, t){
    if (product.sellingByWeight && product.weightOfPrice) {
      return (
        <div className="b-item-full__form__row b-item-full__form__row_fixed">
          <div className="b-item-full__weight">
            <ProductBulk
              good={good}
              product={product}
              onChangeAmount={this.props.onChangeAmount}
              amount={this.props.amount}
              t={t}
            />
          </div>
        </div>
      );
    }
  }

  render() {
    const {
      product,
      t,
      good,
      onSubmit,
      formAuthenticity
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
        {this.renderProductBulkInput(product, good, t)}
        {this.renderContent(product, t)}
      </form>
    );
  }
}
