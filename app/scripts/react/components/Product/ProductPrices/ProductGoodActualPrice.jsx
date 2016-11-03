import React, { Component, PropTypes } from 'react';

import HumanizedMoneyWithCurrency from '../../common/Money/HumanizedMoneyWithCurrency';

const ProductGoodActualPrice = ({ good, t }) => (
  good.actualPrice
    ? <HumanizedMoneyWithCurrency money={good.actualPrice} />
    : <span>{t('vendor.product.blank_price')}</span>
);

ProductGoodActualPrice.propTypes = {
  good: PropTypes.object.isRequired,
}

export default ProductGoodActualPrice;
