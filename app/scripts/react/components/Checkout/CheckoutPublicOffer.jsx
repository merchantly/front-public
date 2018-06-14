import React, { Component } from 'react'; import PropTypes from 'prop-types';

import Checkbox from '../common/Checkbox';
import HiddenInput from '../common/HiddenInput';

class CheckoutPublicOffer extends Component {
  render() {
    const { errorMessage, t, value, url } = this.props;

    return (
      <div className="b-form__row b-cart__form__data-row">
        <div className="form-group boolean">
          <div className="checkbox control-label">
            <HiddenInput
              name="vendor_order[public_offer_accepted]"
              value="0"
            />
            <span className="b-form__checkbox">
              <label className="boolean optional">
                <Checkbox
                  className="boolean m-r-sm"
                  defaultChecked={value}
                  id="vendor_order_public_offer_accepted"
                  name="vendor_order[public_offer_accepted]"
                  value="1"
                />
                <span dangerouslySetInnerHTML={{ __html: t('vendor.order.public_offer_accepted_html', { url }) }} />
              </label>
              {errorMessage
                ? <span className="help-block">{errorMessage}</span>
                : null
              }
            </span>
          </div>
        </div>
      </div>
    );
  }
}

CheckoutPublicOffer.propTypes = {
  errorMessage: PropTypes.string,
  value: PropTypes.bool,
  url: PropTypes.string,
};
CheckoutPublicOffer.defaultProps = {
  url: '',
};

export default CheckoutPublicOffer;