import React, { Component } from 'react'; import PropTypes from 'prop-types';
import WishlistList from './WishlistList';
import * as schemas from 'r/schemas';

class Wishlist extends Component {
  render() {
    const {
      wishlistItems,
      initialCart,
      isPrivate,
      t,
    } = this.props;

    return (
      <section className="b-cart">
        <div className="b-cart__content">
          <h1 className="b-cart__title">
            {t(isPrivate ? 'vendor.wishlist.private_title' : 'vendor.wishlist.foreign_title')}
          </h1>
          {wishlistItems.length > 0
            ? (
              <WishlistList
                initialCart={initialCart}
                isPrivate={isPrivate}
                t={t}
                wishlistItems={wishlistItems}
              />
            )
            : (
            <div className="b-text b-text_center">
              <p>
                {t('vendor.wishlist.empty')}
              </p>
            </div>
            )
          }
        </div>
      </section>
    );
  }
}

Wishlist.propTypes = {
  wishlistItems: PropTypes.arrayOf(schemas.wishlistItem).isRequired,
  initialCart: schemas.cartApi.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default Wishlist;
