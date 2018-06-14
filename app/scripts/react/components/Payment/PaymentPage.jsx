import React, { Component } from 'react'; import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import PaymentContainer, {
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
} from './index';

class PaymentPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      state,
      vendorUrl,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps}
        i18n={i18n}
        showClientBar={false}
      >
        <PaymentContainer {...{
          i18n,
          state,
          vendorUrl,
        }} />
      </VendorLayoutContainer>
    );
  }
}

PaymentPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  state: PropTypes.oneOf([
    PAYMENT_SUCCESS,
    PAYMENT_FAILURE,
  ]).isRequired,
  vendorUrl: PropTypes.string.isRequired,
};

export default PaymentPage;
