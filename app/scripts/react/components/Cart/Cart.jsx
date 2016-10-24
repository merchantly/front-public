import React, { Component, PropTypes } from 'react';
import { CartCoupon } from './CartCoupon';
import CartList from './CartList';
import FormAuthenticity from '../common/FormAuthenticity';
import HumanizedMoneyWithCurrency from '../common/Money/HumanizedMoneyWithCurrency';
import { humanizedMoneyWithCurrency } from 'r/helpers/money';
import { decamelizeKeys } from 'humps';
import Rodal from 'rodal';
import Spinner from 'react-spinjs';
import * as schemas from 'r/schemas';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isProcessing: false,
    };
    this.startProcessing = this.startProcessing.bind(this);
  }
  startProcessing() {
    this.setState({ isProcessing: true });
  }
  renderError(err, key) {
    const id = `cart-error-${key}`;

    return (
      <div id={id} key={id}>
        {err}
      </div>
    );
  }
  renderErrors() {
    const {
      cartErrors,
      isBelowMinimalPrice,
      minimalPrice,
      t,
    } = this.props;

    return (
      <span className="help-block">
        {isBelowMinimalPrice && this.renderError(t('vendor.errors.cart.minimal_price', {
          minimal_price: humanizedMoneyWithCurrency(minimalPrice),
          currency: '',
        }), 'minimal-price')}
        {cartErrors
          .filterNot((_, key) => key === 'minimalPrice')
          .toList()
          .flatten(false)
          .map(this.renderError)
          .valueSeq()
        }
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
      isBelowMinimalPrice,
      packageItem,
      packages,
      prices,
      selectPackage,
      selectedPackage,
      t,
      totalPrice,
    } = this.props;
    const hasErrors = isBelowMinimalPrice || cartErrors.count() > 0;
    const {
      isProcessing,
    } = this.state;

    return (
      <section className="b-cart">
        <Rodal
          onClose={null}
          showCloseButton={false}
          visible={isProcessing}
        >
          <div className="b-modal__container">
            <div className="b-modal__spinner-container">
              <Spinner />
            </div>
            {t('vendor.cart.wait')}
          </div>
        </Rodal>
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
              {hasErrors && this.renderErrors()}
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
                      onClick={this.startProcessing}
                    >
                      {t('vendor.cart.clear')}
                    </a>
                  </div>
                  <div className="b-cart__action__col-right">
                    <CartCoupon code={couponCode} t={t} />
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
  cartItems: PropTypes.array.isRequired,
  changeAmount: PropTypes.func.isRequired,
  couponCode: PropTypes.string,
  formAuthenticity: PropTypes.object,
  isBelowMinimalPrice: PropTypes.bool.isRequired,
  minimalPrice: schemas.money,
  packages: PropTypes.array.isRequired,
  packageItem: PropTypes.object.isRequired,
  prices: PropTypes.object.isRequired,
  selectPackage: PropTypes.func.isRequired,
  selectedPackage: PropTypes.string,
  t: PropTypes.func.isRequired,
  totalPrice: PropTypes.object.isRequired,
};

export default Cart;
