import React, { Component, PropTypes } from 'react';
import { canUseDOM } from 'r/helpers/dom';

class OrderPayment extends Component {
  componentDidMount() {
    const {
      autosubmitTimeout,
      shouldAutosubmit,
    } = this.props;

    if (shouldAutosubmit && canUseDOM()) {
      window.setTimeout(() => this.refs.form.submit(), autosubmitTimeout);
    }
  }
  render() {
    const {
      fields,
      orderPaymentUrl,
      t,
    } = this.props;

    return (
      <div className="b-text b-text_center">
        <h2>
          {t('vendor.order.redirect')}
          <form action={orderPaymentUrl} ref="form">
            {fields.map((field, index) => (
              <input
                key={`form-input-${index}`}
                name={field.name}
                type="hidden"
                value={field.value}
              />
            ))}
            <input
              className="b-btn cart-btn-checkout cart__list-actions-btn"
              data-disable-with={t('vendor.order.redirecting')}
              name={null}
              type="submit"
              value={t('vendor.order.go_to_payment')}
            />
          </form>
        </h2>
      </div>
    );
  }
}

OrderPayment.propTypes = {
  autosubmitTimeout: PropTypes.number,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  orderPaymentUrl: PropTypes.string.isRequired,
  shouldAutosubmit: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default OrderPayment;
