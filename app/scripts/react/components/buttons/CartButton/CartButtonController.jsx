import React, { Component, PropTypes } from 'react';
import BasketStore from '../../../stores/BasketStore';
import CartButton from './CartButton';
import { updateBasketState, initBasketState } from '../../../actions/view/BasketActions';
import { humanizedMoneyWithCurrency } from '../../../helpers/money';

class CartButtonController extends Component {
  constructor(props) {
    super(props);

    this.state = this.getStateFromStore();
  }

  componentDidMount() {
    initBasketState();

    this.syncWithStore = () => {
      this.setState(this.getStateFromStore());
    }

    BasketStore.addChangeListener(this.syncWithStore);
  }
  componentWillUnmount() {
    BasketStore.removeChangeListener(this.syncWithStore)
  }
  getStateFromStore() {
    return {
      basket: BasketStore.getBasket()
    };
  }
  getItemsCount() {
    const { showFullBasketCount } = this.props;
    const { basket } = this.state;

    if (!(basket && basket.items)) {
      return 0;
    }

    if (showFullBasketCount) {
      let total = 0;
      this.state.basket.items.forEach((cartItem) => {
        total += cartItem['count'];
      });
      return total;
    }else{
      return this.state.basket.items.length;
    }
  }
  render() {
    const {
      url,
      t,
    } = this.props;
    const itemsCount = this.getItemsCount();

    // выводим total_price, т.е. без учета стоимости доставки
    const totalPrice = humanizedMoneyWithCurrency(this.state.basket.totalPrice, '');

    return (
      <CartButton
        text={t('vendor.cart.basket_button', {total_price: totalPrice})}
        url={url}
        itemsCount={itemsCount}
      />
    );
  }
}

CartButtonController.propTypes = {
  url: PropTypes.string.isRequired,
  showFullBasketCount: PropTypes.bool
};
CartButtonController.defaultProps = {
  url: PropTypes.string.isRequired,
  showFullBasketCount: false
}

export default CartButtonController;
