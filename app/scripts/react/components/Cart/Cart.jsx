import React, { Component, PropTypes } from 'react';
import { CartCoupon } from './CartCoupon';
import CartList from './CartList';
import FormAuthenticity from '../common/FormAuthenticity';
import HumanizedMoneyWithCurrency from '../common/Money/HumanizedMoneyWithCurrency';
import { decamelizeKeys } from 'humps';

class Cart extends Component {
  renderErrors() {
    const {
      cartErrors,
    } = this.props;

    return (
      <span className="help-block">
        {cartErrors.flatten(false).map((err, key) => (
          <div key={`cart-error-${key}`}>
            {err}
          </div>
        )).valueSeq()}
      </span>
    );
  }
  render() {
    const {
      amounts,
      cartDefaultUrl,
      cartErrors,
      cartItems,
      changeAmount,
      couponCode,
      formAuthenticity,
      packageItem,
      packages,
      prices,
      selectPackage,
      selectedPackage,
      t,
      totalPrice,
    } = this.props;

    return (
      <section className="b-cart">
        <div className="b-cart__content">
          <h1 className="b-cart__title" title={t('vendor.cart.title')}>
            {t('vendor.cart.title')}
          </h1>
          {cartItems.count() === 0
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
              <FormAuthenticity {...formAuthenticity} />
              {cartErrors.count() > 0 && this.renderErrors()}
              <CartList
                amounts={amounts}
                changeAmount={changeAmount}
                items={cartItems}
                packageItem={packageItem}
                packages={packages}
                prices={prices}
                selectPackage={selectPackage}
                selectedPackage={selectedPackage}
                t={t}
              />
              <div className="b-cart__total-sum">
                {t('vendor.cart.overall')}
                {' '}
                <span>
                  <HumanizedMoneyWithCurrency
                    money={decamelizeKeys(totalPrice.toJS())}
                  />
                </span>
              </div>
              <div className="b-cart__action">
                <div className="b-cart__action__container">
                  <div className="b-cart__action__col-clear">
                    <a
                      className="b-cart__action__clear b-btn b-btn_trans"
                      data-confirm={t('vendor.alerts.confirm')}
                      data-disable-with={t('vendor.button.disable_with.waiting')}
                      data-method="delete"
                      href={cartDefaultUrl}
                    >
                      {t('vendor.cart.clear')}
                    </a>
                  </div>
                  <div className="b-cart__action__col-right">
                    <CartCoupon code={couponCode} t={t} />
                    <div className="b-cart__action__col-submit">
                      <input
                        className="b-cart__action__submit b-btn"
                        data-cart-submit
                        data-disable-with={t('vendor.button.disable_with.waiting')}
                        name="commit"
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
        </div>
      </section>
    );
  }
}

Cart.propTypes = {
  amounts: PropTypes.object.isRequired,
  cartDefaultUrl: PropTypes.string.isRequired,
  cartErrors: PropTypes.object.isRequired,
  cartIsFetching: PropTypes.bool.isRequired,
  cartItems: PropTypes.object.isRequired,
  changeAmount: PropTypes.func.isRequired,
  couponCode: PropTypes.string,
  formAuthenticity: PropTypes.object,
  packages: PropTypes.object.isRequired,
  packageItem: PropTypes.object.isRequired,
  prices: PropTypes.object.isRequired,
  selectPackage: PropTypes.func.isRequired,
  selectedPackage: PropTypes.string,
  t: PropTypes.func.isRequired,
  totalPrice: PropTypes.object.isRequired,
};

export default Cart;
