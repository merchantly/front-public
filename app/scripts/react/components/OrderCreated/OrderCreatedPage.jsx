import React, { Component } from 'react'; import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import OrderCreatedContainer from './index';
import * as schemas from 'r/schemas';

class OrderCreatedPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      order,
      vendorRootPath,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps}
        i18n={i18n}
        showClientBar={false}
      >
        <OrderCreatedContainer {...{
          i18n,
          order,
          vendorRootPath,
        }} />
      </VendorLayoutContainer>
    );
  }
}

OrderCreatedPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  order: schemas.order.isRequired,
  vendorRootPath: PropTypes.string,
};

export default OrderCreatedPage;
