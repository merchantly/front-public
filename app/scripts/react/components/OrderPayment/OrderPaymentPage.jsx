import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorPaymentLayoutContainer from 'rc/VendorPaymentLayout';
import OrderPaymentContainer from './index';

class OrderPaymentPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      autosubmitTimeout,
      fields,
      orderPaymentUrl,
      shouldAutosubmit,
      order,
    } = this.props;

    return (
      <VendorPaymentLayoutContainer {...layoutProps}>
        <OrderPaymentContainer {...{
          i18n,
          autosubmitTimeout,
          fields,
          orderPaymentUrl,
          shouldAutosubmit,
          order,
        }} />
      </VendorPaymentLayoutContainer>
    );
  }
}

OrderPaymentPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorPaymentLayoutContainer.propTypes).isRequired,
  autosubmitTimeout: PropTypes.number,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  orderPaymentUrl: PropTypes.string.isRequired,
  shouldAutosubmit: PropTypes.bool.isRequired,
  order: PropTypes.object,
};

export default OrderPaymentPage;
