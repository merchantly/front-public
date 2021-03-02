import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HumanizedMoney from '../../common/Money/HumanizedMoney';
import HumanizedMoneyWithCurrency from '../../common/Money/HumanizedMoneyWithCurrency';

export default class ProductGoodPrices extends Component {
  static propTypes = {
    minPrice: PropTypes.object.isRequired,
    maxPrice: PropTypes.object.isRequired,
    availability: PropTypes.bool
  }
  render() {
    const { minPrice, maxPrice, availability } = this.props;

    return (
      <div className="b-item__price" itemprop="offers" itemScope itemtype="https://schema.org/Offer">
        <meta itemprop="price" content={minPrice.cents} />
        <meta itemProp="priceCurrency" content={minPrice.currencyIsoCode} />
        <meta itemProp="availability" content={availability ? "In stock" : "Out of stock"} />
        <HumanizedMoney money={minPrice} />
        {' - '}
        <HumanizedMoneyWithCurrency money={maxPrice} />
      </div>
    );
  }
}
