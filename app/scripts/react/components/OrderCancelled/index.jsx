import React, { Component } from 'react'; import PropTypes from 'prop-types';
import OrderCancelled from './OrderCancelled';
import provideTranslations from 'rc/HoC/provideTranslations';
import * as schemas from 'r/schemas';

class OrderCancelledContainer extends Component {
  render() {
    return <OrderCancelled {...this.props} />;
  }
}

OrderCancelledContainer.propTypes = {
  isCurrentClientPresent: PropTypes.bool.isRequired,
  order: schemas.order.isRequired,
  t: PropTypes.func.isRequired,
  vendorRootPath: PropTypes.string,
};

OrderCancelledContainer.defaultProps = {
  isCurrentClientPresent: false,
};

export default provideTranslations(OrderCancelledContainer);
