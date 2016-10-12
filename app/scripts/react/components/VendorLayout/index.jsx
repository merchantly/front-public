import React, { Component, PropTypes } from 'react';
import VendorLayout from './VendorLayout';

class VendorLayoutContainer extends Component {
  render() {
    return <VendorLayout {...this.props} />;
  }
}

VendorLayoutContainer.propTypes = {

};

VendorLayoutContainer.defaultProps = {

};

export default VendorLayoutContainer;
