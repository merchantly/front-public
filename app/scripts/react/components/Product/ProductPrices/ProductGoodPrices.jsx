import React, { Component } from 'react'; import PropTypes from 'prop-types';
import HumanizedMoney from '../../common/Money/HumanizedMoney';
import HumanizedMoneyWithCurrency from '../../common/Money/HumanizedMoneyWithCurrency';

export default class ProductGoodPrices extends Component {
  static propTypes = {
    minPrice: PropTypes.object.isRequired,
    maxPrice: PropTypes.object.isRequired,
  }
  render() {
    const { minPrice, maxPrice } = this.props;

    return (
      <div className="b-item__price">
        <HumanizedMoney money={minPrice} />
        {' - '}
        <HumanizedMoneyWithCurrency money={maxPrice} />
      </div>
    );
  }
}