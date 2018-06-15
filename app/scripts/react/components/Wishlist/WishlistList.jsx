import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WishlistItem from './WishlistItem';
import * as schemas from 'r/schemas';

class WishlistList extends Component {
  isInCart(item) {
    const {
      initialCart,
    } = this.props;

    return !!initialCart.items.filter((i) => i.good.id === item.good.id).length;
  }
  render() {
    const {
      wishlistItems,
      isPrivate,
      t,
    } = this.props;

    return (
      <ul className="b-cart__list">
        {wishlistItems.map((item, idx) => (
          <WishlistItem
            isInCart={this.isInCart(item)}
            isPrivate={isPrivate}
            item={item}
            key={`wishlist-item-${idx}`}
            t={t}
          />
        ))}
      </ul>
    );
  }
}

WishlistList.propTypes = {
  wishlistItems: PropTypes.arrayOf(schemas.wishlistItem).isRequired,
  initialCart: schemas.cartApi.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default WishlistList;
