import React, { Component, PropTypes } from 'react';
import CartButton from './CartButton';
import {
  initBasket,
} from 'r/actions/BasketActions';
import { humanizedMoneyWithCurrency } from 'r/helpers/money';
import connectToRedux from 'rc/HoC/connectToRedux';
import { connect } from 'react-redux';
import { canUseDOM } from 'r/helpers/dom';

class CartButtonController extends Component {
  componentWillMount() {
    if (canUseDOM()) {
      this.props.initBasket();
    }
  }
  getItemsCount() {
    const {
      basket,
      showFullBasketCount,
    } = this.props;

    if (!(basket && basket.items)) {
      return 0;
    }

    return showFullBasketCount
      ? basket.items.reduce((total, cartItem) => total += cartItem['count'], 0)
      : basket.items.length;
  }
  render() {
    const {
      basket,
      t,
      url,
    } = this.props;
    const itemsCount = this.getItemsCount();

    // выводим total_price, т.е. без учета стоимости доставки
    const totalPrice = humanizedMoneyWithCurrency(this.state.basket.totalPrice, '');

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
  basket: PropTypes.object.isRequired,
  initBasket: PropTypes.func.isRequired,
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
    basket: state.basket.basket,
  }),
  {
    initBasket,
  }
)(CartButtonController));
