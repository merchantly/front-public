import React, { Component } from 'react';
import VendorPaymentLayout from './VendorPaymentLayout';

class VendorPaymentLayoutContainer extends Component {
  render() {
    return <VendorPaymentLayout {...this.props} />;
  }
}

VendorPaymentLayoutContainer.propTypes = VendorPaymentLayout.propTypes;

export default VendorPaymentLayoutContainer;
