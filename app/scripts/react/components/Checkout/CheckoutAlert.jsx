import React, { Component, PropTypes } from 'react';
import Alert from '../common/Alert';

class CheckoutAlert extends Component {
  render() {
    return (
      <Alert
        className="coupon-info"
        info
        text={this.props.text}
      />
    );
  }
}

CheckoutAlert.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CheckoutAlert;
