import $ from 'jquery';
import React, { Component, PropTypes } from 'react';

import * as apiRoutes from '../../../routes/api';
import TextInput from '../common/TextInput';
import CheckoutAlert from './CheckoutAlert';

class CheckoutCoupon extends Component {
  state = {
    code: this.props.code,
    message: this.props.message,
  }
  componentDidMount() {
    if (this.props.code) {
      this.processCode(this.props.code);
    }
  }
  processCode(value) {
    const { t } = this.props;
    const { code } = this.state;

    if (value === '') {
      this.updateMessage('');
    } else {
      this.updateMessage(t('vendor.coupon.checking'));

      this.checkCode(value)
        .then((data) => {
          let message;

          if (data && data.isActual) {
            message = t('vendor.coupon.discount', { discount: data.discount });
          } else {
            message = t('vendor.coupon.invalid', { value });
          }

          this.updateMessage(message);
        })
        .fail((xhr, textStatus) => {
          if (textStatus !== 'abort') {
            this.updateMessage(t('vendor.coupon.error'));
          }
        });
    }

    this.setState({ code: value });
  }
  checkCode(code) {
    if (this.pendingRequest) this.pendingRequest.abort();

    this.pendingRequest = $.ajax({
      url: apiRoutes.checkCouponCode(),
      type: 'POST',
      data: { code },
    });

    return this.pendingRequest;
  }
  updateMessage(message) {
    this.setState({ message });
  }
  render() {
    const { fieldName, t } = this.props;
    const { code, message } = this.state;
    const id = `vendor_order_${fieldName}`;
    const name = `vendor_order[${fieldName}]`;

    return (
      <div className="b-form__row__widget">
        <div className="form-group string">
          <label
            className="string control-label"
            htmlFor={id}
          >
            {t('vendor.order.fields.coupon_code')}
          </label>
          <TextInput
            className="string form-control"
            id={id}
            name={name}
            onChange={(e) => this.processCode(e.target.value)}
            placeholder={t('vendor.placeholders.coupon')}
            value={code}
          />
        </div>
        {code && message && <CheckoutAlert text={message} />}
      </div>
    );
  }
}

CheckoutCoupon.propTypes = {
  code: PropTypes.string,
  fieldName: PropTypes.string,
  message: PropTypes.string,
};
CheckoutCoupon.defaultProps = {
  code: '',
  fieldName: 'coupon_code',
  message: '',
};

export default CheckoutCoupon;
