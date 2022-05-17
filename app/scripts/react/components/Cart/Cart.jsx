import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CartCoupon } from './CartCoupon';
import CartList from './CartList';
import FormAuthenticity from '../common/FormAuthenticity';
import HumanizedMoneyWithCurrency from '../common/Money/HumanizedMoneyWithCurrency';
import { humanizedMoneyWithCurrency } from 'r/helpers/money';
import Rodal from 'rodal';
import ReactSpinner from 'react16-spinjs';
import * as schemas from 'r/schemas';
import size from 'lodash/size';
import omit from 'lodash/omit';
import mapKeys from 'lodash/mapKeys';
import map from 'lodash/map';
import transform from 'lodash/transform';
import flow from 'lodash/flow';
import flatten from 'lodash/flatten';
import ProductCardSimilarProducts from '../Product/ProductCard/ProductCardSimilarProducts';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isProcessing: false,
    };
    this.startProcessing = this.startProcessing.bind(this);
  }
  startProcessing() {
    try {
      $(window).trigger('m.cart-submit', [this.props.cartItems, this.props.packageItem]);
    } catch (e) {
      console.log('trigger: ', e.message);
    }

    this.setState({ isProcessing: true });
  }
  renderError(err, key) {
    const id = `cart-error-${key}`;

    return (
      <div
        dangerouslySetInnerHTML={{ __html: err }}
        id={id}
        key={id}
      />
    );
  }
  renderErrors(suffix = '') {
    const {
      cartErrors,
      isBelowMinimalPrice,
      minimalPrice,
      t,
    } = this.props;

    //const errors = map(
    //mapKeys(
    //flatten(Object.values(omit(cartErrors, 'minimalPrice'))),
    //(_, k) => `${k}-${suffix}`
    //),
    //this.renderError
    //)

    const buffer = mapKeys(
      flatten(Object.values(omit(cartErrors, 'minimalPrice'))),
      (_, k) => `${k}-${suffix}`
    )

    const errors = transform(
      buffer,
      (ag, value, key) => {
        ag.push(this.renderError(value, key))
        return true
      },
      []
    )
    return (
      <span className="help-block">
        {isBelowMinimalPrice && this.renderError(t('vendor.errors.cart.minimal_price', {
          minimal_price: humanizedMoneyWithCurrency(minimalPrice),
          currency: '',
        }), `minimal-price-${suffix}`)}
        {errors}
      </span>
    );
  }
  render() {
    const {
      amounts,
      cartDefaultUrl,
      cleanCartUrl,
      cartErrors,
      cartItems,
      changeAmount,
      changePackageCount,
      continueShoppingUrl,
      couponCode,
      formAuthenticity,
      isBelowMinimalPrice,
      isHeaderButtons,
      packageItem,
      packageCount,
      packagePrice,
      packages,
      prices,
      selectPackage,
      selectedPackage,
      t,
      totalPrice,
      totalVatAmount,
      totalWithoutAmount,
      showCouponCode,
      deliveryRestrictionMessages,
      recommendedProducts
    } = this.props;
    const hasErrors = isBelowMinimalPrice ||
      size(omit(cartErrors, 'minimalPrice')) > 0;
    const {
      isProcessing,
    } = this.state;

    return (
      <section className="b-cart">
        <Rodal
          onClose={() => { }}
          showCloseButton={false}
          visible={isProcessing}
        >
          <div className="b-modal__container">
            <div className="b-modal__spinner-container">
              <ReactSpinner />
            </div>
            {t('vendor.cart.wait')}
          </div>
        </Rodal>
        <div className="b-cart__content">
          <h1 className="b-cart__title" title={t('vendor.cart.title')}>
            {t('vendor.cart.title')}
          </h1>
          {size(cartItems) === 0
            ? (
              <div className="b-text b-text_center">
                <p>
                  {t('vendor.cart.empty')}
                </p>
              </div>
            )
            : (
              <form
                acceptCharset="UTF-8"
                action={cartDefaultUrl}
                className="simple_form edit_cart"
                id="edit_cart"
                method="post"
                noValidate
              >
                {isHeaderButtons && (
                  <div className="b-cart__action">
                    <div className="b-cart__action__container">
                      <div className="b-cart__action__col-clear">
                        <a
                          className="b-cart__action__clear b-btn b-btn_trans"
                          href={continueShoppingUrl}
                        >
                          {t('vendor.cart.continue_shopping')}
                        </a>
                      </div>
                      <div className="b-cart__action__col-right">
                        <div className="b-cart__action__col-submit">
                          <input
                            className="b-cart__action__submit b-btn element--active-opacity"
                            data-cart-submit
                            data-disable-with={t('vendor.button.disable_with.waiting')}
                            disabled={isBelowMinimalPrice}
                            name="commit"
                            onClick={this.startProcessing}
                            type="submit"
                            value={t('vendor.order.submit')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <FormAuthenticity {...formAuthenticity} />
                {hasErrors && this.renderErrors('top')}
                {deliveryRestrictionMessages &&
                  deliveryRestrictionMessages.map((message) => <span className="delivery-restriction-messages">{message}</span>)
                }
                <CartList
                  amounts={amounts}
                  changeAmount={changeAmount}
                  changePackageCount={changePackageCount}
                  items={cartItems}
                  packageCount={packageCount}
                  packageItem={packageItem}
                  packagePrice={packagePrice}
                  packages={packages}
                  prices={prices}
                  selectPackage={selectPackage}
                  selectedPackage={selectedPackage}
                  t={t}
                />
                {totalVatAmount && totalVatAmount.cents !== 0 &&
                  <div className="b-cart__vat-amount">
                    {t('vendor.cart.vat_amount')}
                    {' '}
                    <span>
                      <HumanizedMoneyWithCurrency
                        money={totalVatAmount}
                      />
                    </span>
                  </div>
                }
                {totalVatAmount && totalVatAmount.cents !== 0 &&
                  <div className="b-cart__total-without-amount">
                    {t('vendor.cart.total_without_amount')}
                    {' '}
                    <span>
                      <HumanizedMoneyWithCurrency
                        money={totalWithoutAmount}
                      />
                    </span>
                  </div>
                }
                <div className="b-cart__total-sum">
                  {t('vendor.cart.overall')}
                  {' '}
                  <span>
                    <HumanizedMoneyWithCurrency
                      money={totalPrice}
                    />
                  </span>
                </div>
                {hasErrors && this.renderErrors('bottom')}
                <div className="b-cart__action">
                  <div className="b-cart__action__container">
                    <div className="b-cart__action__col-clear">
                      <a
                        className="b-cart__action__clear b-btn b-btn_trans"
                        data-confirm={t('vendor.alerts.confirm')}
                        data-disable-with={t('vendor.button.disable_with.waiting')}
                        data-method="delete"
                        href={cleanCartUrl}
                        onClick={this.startProcessing}
                      >
                        {t('vendor.cart.clear')}
                      </a>
                    </div>
                    <div className="b-cart__action__col-right">
                      {showCouponCode && <CartCoupon code={couponCode} t={t} />}
                      <div className="b-cart__action__col-submit">
                        <input
                          className="b-cart__action__submit b-btn element--active-opacity"
                          data-cart-submit
                          data-disable-with={t('vendor.button.disable_with.waiting')}
                          disabled={isBelowMinimalPrice}
                          name="commit"
                          onClick={this.startProcessing}
                          type="submit"
                          value={t('vendor.order.submit')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )
          }
          <ProductCardSimilarProducts products={recommendedProducts.products} t={t} showCartButton={recommendedProducts.showCartButton} />
        </div>
      </section>
    );
  }
}

Cart.propTypes = {
  amounts: PropTypes.object.isRequired,
  cartDefaultUrl: PropTypes.string.isRequired,
  cleanCartUrl: PropTypes.string.isRequired,
  cartErrors: PropTypes.object.isRequired,
  cartIsFetching: PropTypes.bool.isRequired,
  cartItems: PropTypes.array.isRequired,
  changeAmount: PropTypes.func.isRequired,
  changePackageCount: PropTypes.func.isRequired,
  continueShoppingUrl: PropTypes.string,
  couponCode: PropTypes.string,
  formAuthenticity: PropTypes.object,
  isBelowMinimalPrice: PropTypes.bool.isRequired,
  isHeaderButtons: PropTypes.bool.isRequired,
  minimalPrice: schemas.money,
  packages: PropTypes.array.isRequired,
  packageCount: PropTypes.number.isRequired,
  packageItem: PropTypes.object.isRequired,
  packagePrice: schemas.money,
  prices: PropTypes.object.isRequired,
  selectPackage: PropTypes.func.isRequired,
  selectedPackage: PropTypes.string,
  t: PropTypes.func.isRequired,
  totalPrice: PropTypes.object.isRequired,
  totalVatAmount: PropTypes.object,
  totalWithoutAmount: PropTypes.object,
  deliveryRestrictionMessages: PropTypes.arrayOf(PropTypes.string),
  recommendedProducts: PropTypes.object,
};

Cart.defaultProps = {
  recommendedProducts: { showCartButton: false, products: [] },
};

export default Cart;
