import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HumanizedMoneyWithCurrency from '../common/Money/HumanizedMoneyWithCurrency';
import { isEmpty } from 'lodash';

class OrderTitle extends Component {
  componentWillUpdate(nextProps) {
    if (this.props.totalPrice.cents !== nextProps.totalPrice.cents) {
      this.animatePriceChanges();
    }
  }
  animatePriceChanges() {
    const priceNode = this.refs.price;

    if (!priceNode) {
      return;
    }

    priceNode.classList.add('animated');
    priceNode.classList.add('bounce');
    window.setTimeout(() => {
      priceNode.classList.remove('animated');
      priceNode.classList.remove('bounce');
    }, 1000)
  }
  render() {
    const {
      t,
      totalCount,
      totalPrice,
    } = this.props;

    if (totalCount || !isEmpty(totalPrice)) {
      return (
        <h1 className="b-cart__title">
          {`${t('vendor.pages.titles.order')} `}
          <strong>
            {t('vendor.entities.product', {count: totalCount})}
          </strong>
          {` ${t('vendor.order.new.sum')} `}
          <strong className="b-cart__title-price" ref="price">
            <HumanizedMoneyWithCurrency money={totalPrice} />
          </strong>
        </h1>
      );
    }

    return null;
  }
}

OrderTitle.propTypes = {
  t: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.object.isRequired,
};

export default OrderTitle;
