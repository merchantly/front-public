import React, { Component, PropTypes } from 'react';
import Icon from '../../common/Icon';
import Link from '../../common/Link';
import URI from 'urijs';

export default class ProductCartWishlist extends Component {
  static propTypes = {
    addWishlistText: PropTypes.string,
    addWishlistUrl: PropTypes.string,
    good: PropTypes.object,
    goWishlistText: PropTypes.string,
    product: PropTypes.object.isRequired,
    hasWishlist: PropTypes.bool,
    isWishlisted: PropTypes.bool,
    wishlistUrl: PropTypes.string,
  };
  static contextTypes = {
    isWidget: PropTypes.bool,
  };
  getAddWishlistUrl() {
    const { addWishlistUrl, good, product } = this.props;

    return new URI(addWishlistUrl)
      .addQuery('good_id', good ? good.global_id : product.global_id)
      .toString();
  }
  render() {
    const {
      addWishlistText,
      addWishlistUrl,
      goWishlistText,
      hasWishlist,
      isWishlisted,
      wishlistUrl,
    } = this.props;
    const {
      isWidget,
    } = this.context;

    if (isWidget) {
      return null;
    }

    if (hasWishlist && (wishlistUrl || addWishlistUrl)) {
      let content;

      if (isWishlisted) {
        content = (
          <Link href={wishlistUrl}>
            <Icon active name="wishlist" />
            {goWishlistText}
          </Link>
        );
      } else {
        content = (
          <Link href={this.getAddWishlistUrl()} method="POST">
            <Icon active name="wishlist" />
            {addWishlistText}
          </Link>
        );
      }

      return (
        <div className="add-to-wishlist">
          {content}
        </div>
      );
    }

    return null;
  }
}
