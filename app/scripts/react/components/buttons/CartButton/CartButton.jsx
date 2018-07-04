import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from '../Bubble';
import { cartRoute } from 'scripts/routes/app';

class CartButton extends Component {
  render() {
    const {
      itemsCount,
      text,
      url,
    } = this.props;

    return (
      <Bubble
        className="Bubble--cart element--active-opacity"
        count={itemsCount}
        data={{ 'cart-button': true }}
        hash={cartRoute()}
        text={text}
        url={url}
      />
    );
  }
}

export default CartButton;
