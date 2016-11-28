import React, { Component, PropTypes } from 'react';
import CartListItem from './CartListItem';
import CartListPackageItem from './CartListPackageItem';
import CartListPackages from './CartListPackages';
import { map, isEmpty } from 'lodash';
import * as schemas from 'r/schemas';

class CartList extends Component {
  render() {
    const {
      amounts,
      changeAmount,
      changePackageCount,
      items,
      packageCount,
      packageItem,
      packagePrice,
      packages,
      prices,
      selectPackage,
      selectedPackage,
      t,
    } = this.props;

    return (
      <ul className="b-cart__list">
        {map(items, (item, idx) => {
          const { id: itemId } = item;

          return (
            <CartListItem
              amount={amounts[itemId] || 0}
              changeAmount={changeAmount}
              item={item}
              key={`cart-item-${idx}`}
              price={prices[itemId] || 0}
              t={t}
            />
          );
        })}
        {!isEmpty(packageItem)
          ? (
            <CartListPackageItem
              {...{
                changePackageCount,
                item: packageItem,
                packageCount,
                packagePrice,
                t,
              }}
            />
          )
          : (
            <CartListPackages
              {...{
                changePackageCount,
                packageCount,
                packagePrice,
                packages,
                selectPackage,
                selectedPackage,
                t,
              }}
            />
          )
        }
      </ul>
    );
  }
}

CartList.propTypes = {
  amounts: PropTypes.object.isRequired,
  changeAmount: PropTypes.func.isRequired,
  changePackageCount: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  packageCount: PropTypes.number.isRequired,
  packageItem: PropTypes.object.isRequired,
  packagePrice: schemas.money,
  packages: PropTypes.array.isRequired,
  prices: PropTypes.object.isRequired,
  selectPackage: PropTypes.func.isRequired,
  selectedPackage: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default CartList;
