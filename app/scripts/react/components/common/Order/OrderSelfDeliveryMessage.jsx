import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OrderSelfDeliveryMessage extends Component {
  render() {
    const {
      deliveryType: {
        selfdelivery,
        pickupAdress,
      },
      t,
    } = this.props;

    return selfdelivery && pickupAdress != null
      ? (
        <span>
          {t('vendor.order.pickup_address')}
          {pickupAdress}
        </span>
      )
      : null;
  }
}

OrderSelfDeliveryMessage.propTypes = {
  deliveryType: PropTypes.shape({
    selfdelivery: PropTypes.bool,
    pickupAddress: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

OrderSelfDeliveryMessage.defaultProps = {
  deliveryType: {
    selfdelivery: false,
  },
};

export default OrderSelfDeliveryMessage;
