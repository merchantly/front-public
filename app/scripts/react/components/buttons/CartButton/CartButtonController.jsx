import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartButton from './CartButton';
import {
  fetchCart,
} from 'r/actions/CartActions';
import { humanizedMoneyWithCurrency } from 'r/helpers/money';
import connectToRedux from 'rc/HoC/connectToRedux';
import { connect } from 'react-redux';
import { canUseDOM } from 'r/helpers/dom';

class CartButtonController extends Component {
  componentWillMount() {
    if (canUseDOM()) {
      this.props.fetchCart();
    }
  }
  getItemsCount() {
    const {
      cart,
      showFullBasketCount,
    } = this.props;

    if (!(cart && cart.items)) {
      return 0;
    }

    return showFullBasketCount
      ? cart.items.reduce((total, cartItem) => total += cartItem['count'], 0)
      : cart.items.length;
  }
  render() {
    const {
      cart,
      t,
      url,
    } = this.props;
    const itemsCount = this.getItemsCount();

    // выводим total_price, т.е. без учета стоимости доставки
    const totalPrice = humanizedMoneyWithCurrency(cart.totalPrice, '');

    return (
      <CartButton
        itemsCount={itemsCount}
        text={t('vendor.cart.basket_button', { totalPrice })}
        url={url}
      />
    );
  }
}

CartButtonController.propTypes = {
  cart: PropTypes.object.isRequired,
  fetchCart: PropTypes.func.isRequired,
  showFullBasketCount: PropTypes.bool,
  t: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

CartButtonController.defaultProps = {
  showFullBasketCount: false,
  url: PropTypes.string.isRequired,
};

export default connectToRedux(connect(
  (state) => ({
    cart: state.cart.cart,
  }),
  {
    fetchCart,
  }
)(CartButtonController));
