import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CabinetButton } from '../buttons/CabinetButton';
import { WishlistButton } from '../buttons/WishlistButton';
import CartButtonController from '../buttons/CartButton/CartButtonController';

class Clientbar extends Component {
  render() {
    const {
      cabinetText,
      cabinetUrl,
      cartUrl,
      showFullBasketCount,
      t,
      hasCabinet,
      hasWishlist,
      wishlistText,
      wishlistUrl,
    } = this.props;

    return (
      <div className="Clientbar">
        {hasCabinet && cabinetUrl &&
          <CabinetButton
            text={cabinetText}
            url={cabinetUrl}
          />
        }
        {hasWishlist && wishlistUrl &&
          <WishlistButton
            text={wishlistText}
            url={wishlistUrl}
          />
        }
        {cartUrl &&
          <CartButtonController
            showFullBasketCount={showFullBasketCount}
            t={t}
            url={cartUrl}
          />
        }
      </div>
    );
  }
}

Clientbar.propTypes = {
  cabinetText: PropTypes.string,
  cabinetUrl: PropTypes.string,
  cartUrl: PropTypes.string,
  hasCabinet: PropTypes.bool,
  hasWishlist: PropTypes.bool,
  wishlistText: PropTypes.string,
  wishlistUrl: PropTypes.string,
  showFullBasketCount: PropTypes.bool,
  t: PropTypes.func,
};

Clientbar.defaultProps = {
  hasCabinet: false,
  hasWishlist: false,
  showFullBasketCount: false,
};

export default Clientbar;
