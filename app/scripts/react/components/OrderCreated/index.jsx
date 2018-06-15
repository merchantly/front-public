import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderCreated from './OrderCreated';
import * as schemas from 'r/schemas';
import provideTranslations from 'rc/HoC/provideTranslations';

class OrderCreatedContainer extends Component {
  render() {
    return <OrderCreated {...this.props} />;
  }
}

OrderCreatedContainer.propTypes = {
  order: schemas.order.isRequired,
  t: PropTypes.func.isRequired,
  vendorRootPath: PropTypes.string.isRequired,
};

export default provideTranslations(OrderCreatedContainer);
