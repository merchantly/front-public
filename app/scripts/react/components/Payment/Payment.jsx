import React, { Component, PropTypes } from 'react';

export const PAYMENT_SUCCESS = 'success';
export const PAYMENT_FAILURE = 'failure';

class Payment extends Component {
  render() {
    const {
      state,
      vendorUrl,
      t,
    } = this.props;

    const cartTitle = state === PAYMENT_SUCCESS
      ? t('vendor.payment.w1.success.title')
      : t('vendor.payment.w1.failure.title');
    const cartMessage = state === PAYMENT_SUCCESS
      ? t('vendor.payment.w1.success.desc')
      : t('vendor.payment.w1.failure.desc');

    return (
      <div className="b-page__content__inner b-page__content__inner_content">
        <section className="b-cart">
          <div className="b-cart__content">
            <h1 className="b-cart__title">
              {cartTitle}
            </h1>
            <div className="b-cart__message">
              <p>
                {cartMessage}
              </p>
              <a className="b-btn" href={vendorUrl}>
                {t('vendor.order.continue_shopping')}
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Payment.propTypes = {
  state: PropTypes.oneOf([
    PAYMENT_SUCCESS,
    PAYMENT_FAILURE,
  ]).isRequired,
  vendorUrl: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Payment;
