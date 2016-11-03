import React, { Component, PropTypes } from 'react';
import { CartCoupon } from './CartCoupon';
import CartList from './CartList';
import FormAuthenticity from '../common/FormAuthenticity';
import HumanizedMoneyWithCurrency from '../common/Money/HumanizedMoneyWithCurrency';
import { humanizedMoneyWithCurrency } from 'r/helpers/money';
import Rodal from 'rodal';
import Spinner from 'react-spinjs';
import * as schemas from 'r/schemas';
import { chain, size, omit } from 'lodash';

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
      <div
        dangerouslySetInnerHTML={{__html: err}}
        id={id}
        key={id}
      />
    );
  }
  renderErrors(suffix='') {
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
        }), `minimal-price-${suffix}`)}
        {chain(cartErrors)
          .omit('minimalPrice')
          .toArray()
          .flatten(true)
          .mapKeys((_, k) => `${k}-${suffix}`)
          .map(this.renderError)
          .value()
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
    } = this.props;
    const hasErrors = isBelowMinimalPrice ||
      size(omit(cartErrors, 'minimalPrice')) > 0;
    const {
      isProcessing,
    } = this.state;

    return (
      <section className="b-cart">
        <Rodal
          onClose={() => {}}
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
                <div className="b-cart__total-sum">
                  {t('vendor.cart.overall')}
                  {' '}
                  <span>
                    <HumanizedMoneyWithCurrency
                      money={decamelizeKeys(totalPrice)}
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
};

export default Cart;
