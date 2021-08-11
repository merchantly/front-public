import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HumanizedMoneyWithCurrency from '../common/Money/HumanizedMoneyWithCurrency';
import { humanizedMoneyWithCurrency } from 'r/helpers/money';
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
    setTimeout(() => {
      priceNode.classList.remove('animated');
      priceNode.classList.remove('bounce');
    }, 1000);
  }
  renderTotalVat(totalVat, totalWithoutVat) {
    if (!totalVat.cents) {
      return;
    }

    const {
      t
    } = this.props;

    return t('vendor.order.total_vat', { total_vat: humanizedMoneyWithCurrency(totalVat), total_without_vat: humanizedMoneyWithCurrency(totalWithoutVat) });
  }
  render() {
    const {
      t,
      totalCount,
      totalPrice,
      totalVat,
      totalWithoutVat
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
          { this.renderTotalVat(totalVat, totalWithoutVat) }
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
  totalVat: PropTypes.object.isRequired,
  totalWithoutVat: PropTypes.object.isRequired,
};

export default OrderTitle;
