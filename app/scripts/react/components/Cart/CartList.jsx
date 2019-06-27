import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartListItem from './CartListItem';
import CartListPackageItem from './CartListPackageItem';
import CartListPackages from './CartListPackages';
import { map, isEmpty } from 'lodash';
import * as schemas from 'r/schemas';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement(({amount, changeAmount, item, itemId, price, t }) => {   
  return (    
    <CartListItem amount={amount} changeAmount={changeAmount} key={`cart-list-item-${itemId}`} item={item} price={price} t={t}/>    
  );
});

const SortableList = SortableContainer(({
            items, amounts, changeAmount, prices, t,
            packageCount, packagePrice, packages, selectPackage,
            selectedPackage, packageItem, changePackageCount}) => {    
  return (
    <div> 
      {items.map((item, idx) => {
        const { id: itemId } = item;        
        return (
          <SortableItem
            amount={amounts[itemId] || 0}
            changeAmount={changeAmount}
            item={item}
            index={idx}
            key={itemId}            
            itemId={itemId}
            price={prices[itemId] || 0}            
            t={t}
          />
        )
      })
      }      
    </div>
  )

});

class CartList extends Component {

  constructor(props) {
    super(props);
    this.state = { items: this.props.items };
  }

  onSortEnd = ({oldIndex, newIndex}) => {    
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

  render() {
    const {
      amounts,
      changeAmount,
      changePackageCount,
      packageCount,
      packageItem,
      packagePrice,
      packages,
      prices,
      selectPackage,
      selectedPackage,
      t,
    } = this.props;

    const {
      items
    } = this.state;

    return (    
      <ul className="b-cart__list">        
      <SortableList items={items} amounts={amounts} changeAmount={changeAmount}
                    changePackageCount={changePackageCount} packageCount={packageCount} packages={packages}
                    selectPackage={selectPackage} selectedPackage={selectedPackage} packageItem={packageItem}
                    prices={prices} t={t} lockAxis="y" onSortEnd={this.onSortEnd} useDragHandle={true} />
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
