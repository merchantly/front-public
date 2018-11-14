import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HumanizedMoneyWithCurrency from '../../common/Money/HumanizedMoneyWithCurrency';

const ProductGoodActualPrice = ({ good, t }) => (
  good.actualPrice
    ? <HumanizedMoneyWithCurrency money={good.actualPrice.price />
    : <span>{t('vendor.product.blank_price')}</span>
);

ProductGoodActualPrice.propTypes = {
  good: PropTypes.object.isRequired,
}

export default ProductGoodActualPrice;
