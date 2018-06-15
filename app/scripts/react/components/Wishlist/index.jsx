import React, { Component } from 'react';
import PropTypes from 'prop-types';
import provideTranslations from 'rc/HoC/provideTranslations';
import Wishlist from './Wishlist';
import * as schemas from 'r/schemas';

class WishlistContainer extends Component {
  render() {
    return <Wishlist {...this.props} />;
  }
}

WishlistContainer.propTypes = {
  wishlistItems: PropTypes.arrayOf(schemas.wishlistItem).isRequired,
  initialCart: schemas.cartApi.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

WishlistContainer.defaultProps = {
  wishlistItems: [],
  initialCart: {
    items: [],
    totalPrice: {},
    errors: {},
    defaultUrl: '',
  },
  isPrivate: true,
};

export default provideTranslations(WishlistContainer);
