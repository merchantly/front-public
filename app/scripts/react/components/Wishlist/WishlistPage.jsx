import React, { Component, PropTypes } from 'react';
import VendorLayoutContainer from 'rc/VendorLayout';
import WishlistContainer from './index';
import * as schemas from 'r/schemas';

class WishlistPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      isPrivate,
      initialCart,
      wishlistItems,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <WishlistContainer {...{
          i18n,
          isPrivate,
          initialCart,
          wishlistItems,
        }} />
      </VendorLayoutContainer>

    );
  }
}

WishlistPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  isPrivate: PropTypes.bool.isRequired,
  initialCart: schemas.cartApi.isRequired,
  wishlistItems: PropTypes.arrayOf(schemas.wishlistItem).isRequired,
};

export default WishlistPage;
