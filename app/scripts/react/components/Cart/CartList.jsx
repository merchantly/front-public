import React, { Component, PropTypes } from 'react';
import CartListItem from './CartListItem';
import CartListPackageItem from './CartListPackageItem';
import CartListPackages from './CartListPackages';
import { map, isEmpty } from 'lodash';

class CartList extends Component {
  render() {
    const {
      amounts,
      changeAmount,
      items,
      packageItem,
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
              item={packageItem}
              t={t}
            />
          )
          : (
            <CartListPackages
              packages={packages}
              selectPackage={selectPackage}
              selectedPackage={selectedPackage}
              t={t}
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
  items: PropTypes.array.isRequired,
  packageItem: PropTypes.object.isRequired,
  packages: PropTypes.array.isRequired,
  prices: PropTypes.object.isRequired,
  selectPackage: PropTypes.func.isRequired,
  selectedPackage: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default CartList;
