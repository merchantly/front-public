import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import OrderCancelledContainer from './index';
import * as schemas from 'r/schemas';

class OrderCancelledPage extends Component {
  render() {
    const {
      i18n,
      isCurrentClientPresent,
      layoutProps,
      order,
      vendorRootPath,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps}
        i18n={i18n}
        showClientBar={false}
      >
        <OrderCancelledContainer {...{
          i18n,
          isCurrentClientPresent,
          layoutProps,
          order,
          vendorRootPath,
        }} />
      </VendorLayoutContainer>
    );
  }
}

OrderCancelledPage.propTypes = {
  i18n: PropTypes.object,
  isCurrentClientPresent: PropTypes.bool.isRequired,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  order: schemas.order.isRequired,
  vendorRootPath: PropTypes.string,
};

export default OrderCancelledPage;
