import React, { Component, PropTypes } from 'react';
import VendorLayoutContainer from 'rc/VendorLayout';
import OrderPaidContainer from './index';
import * as schemas from 'r/schemas';

class OrderPaidPage extends Component {
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
        <OrderPaidContainer {...{
          i18n,
          isCurrentClientPresent,
          order,
          vendorRootPath,
        }} />
      </VendorLayoutContainer>
    );
  }
}

OrderPaidPage.propTypes = {
  i18n: PropTypes.object,
  isCurrentClientPresent: PropTypes.bool.isRequired,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  order: schemas.order.isRequired,
  vendorRootPath: PropTypes.string,
};

export default OrderPaidPage;
