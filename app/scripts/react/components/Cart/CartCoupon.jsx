import $ from 'jquery';
import React, { Component } from 'react'; import PropTypes from 'prop-types';
import * as apiRoutes from '../../../routes/api';

import provideTranslations from '../HoC/provideTranslations';

import CartAlert from './CartAlert';
import TextInput from '../common/TextInput';

export class CartCoupon extends Component {
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
    const { t } = this.props;
    const { code, message } = this.state;

    return (
      <div className="b-cart__action__col-code">
        <TextInput
          className="b-cart__action__code"
          name="coupon_code"
          onChange={(e) => this.processCode(e.target.value)}
          placeholder={t('vendor.placeholders.coupon')}
          value={code}
        />
        {code && message && <CartAlert text={message} />}
      </div>
    );
  }
}

CartCoupon.propTypes = {
  code: PropTypes.string,
  message: PropTypes.string,
};

CartCoupon.defaultProps = {
  code: '',
  message: '',
};

export default provideTranslations(CartCoupon);
