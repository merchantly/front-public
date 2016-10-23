import React, { Component } from 'react';
import VendorLayout from './VendorLayout';
import provideTranslations from 'rc/HoC/provideTranslations';

class VendorLayoutContainer extends Component {
  render() {
    return <VendorLayout {...this.props} />;
  }
}

VendorLayoutContainer.propTypes = VendorLayout.propTypes;

export default provideTranslations(VendorLayoutContainer);
