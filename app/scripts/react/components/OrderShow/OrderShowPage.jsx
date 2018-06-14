import React, { Component } from 'react'; import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import OrderShowContainer from './index';
import * as schemas from 'r/schemas';

class OrderShowPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      order,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps}
        i18n={i18n}
        showClientBar={false}
      >
        <OrderShowContainer {...{
          i18n,
          order,
        }} />
      </VendorLayoutContainer>
    );
  }
}

OrderShowPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  order: schemas.order.isRequired,
};

export default OrderShowPage;
