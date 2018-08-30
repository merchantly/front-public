import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from '../common/Alert';

export default class CartAlert extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }
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
