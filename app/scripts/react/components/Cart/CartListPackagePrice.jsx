import React, { PropTypes } from 'react';
import Select from 'rc/common/Select';
import HumanizedMoneyWithCurrency from 'rc/common/Money/HumanizedMoneyWithCurrency';
import { decamelizeKeys } from 'humps';
import * as schemas from 'r/schemas';
import { range } from 'lodash';

function CartListPackagePrice(props) {
  const {
    globalId,
    changePackageCount,
    packageCount,
    packagePrice,
    t,
  } = props;
  const options = range(1, 10)
    .map((i) => ({
      value: i,
      title: i,
    }));

  return (
    <div className="b-cart__item__col-package-price">
      <div className="b-cart__item__col-quantity">
        <input
          name="cart[package_good_global_id]"
          type="hidden"
          value={globalId}
        />
        <span className="b-cart__item__quantity__text">
          {t('vendor.cart.amount')}
        </span>
        <div className="b-cart__item__quantity__select">
          <Select
            name={'cart[package_count]'}
            onChange={changePackageCount}
            options={options}
            value={packageCount}
          />
        </div>
      </div>
      <div className="b-cart__item__col-price">
        <div className="b-cart__item__price">
          <HumanizedMoneyWithCurrency
            money={decamelizeKeys(packagePrice)}
          />
        </div>
      </div>
    </div>
  );
}

CartListPackagePrice.propTypes = {
  globalId: PropTypes.string.isRequired,
  changePackageCount: PropTypes.func.isRequired,
  packageCount: PropTypes.number.isRequired,
  packagePrice: schemas.money,
  t: PropTypes.func.isRequired,
};

export default CartListPackagePrice;
