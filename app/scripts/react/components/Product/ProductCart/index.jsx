import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    notAvailableContent: PropTypes.string,
    showAuthForBuyButton: PropTypes.bool,
  }
  static defaultProps = {
    formAuthenticity: {},
  }

  redirectToSignIn() {
    window.location.href = '/signin'
  }

  renderContent(product, t, showAuthForBuyButton) {
    if (showAuthForBuyButton) {
      return (
        <div className="b-item-full__form__submit">
          <div className="b-btn b-btn_trans" onClick={this.redirectToSignIn.bind(this)}>
            {this.props.t('vendor.button.auth_for_buy')}
          </div>
        </div>
      )
    } else {
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
      formAuthenticity,
      showAuthForBuyButton
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
        {this.renderContent(product, t, showAuthForBuyButton)}
      </form>
    );
  }
}
