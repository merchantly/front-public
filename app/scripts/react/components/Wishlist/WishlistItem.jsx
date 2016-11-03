import React, { Component, PropTypes } from 'react';
import * as schemas from 'r/schemas';
import AssetImage from 'rc/common/AssetImage';
import Image from 'rc/common/Image/Image';
import { humanizedMoneyWithCurrency } from 'r/helpers/money';
import GoodDetails from 'rc/common/GoodDetails';
import WishlistAddToCartButton from './WishlistAddToCartButton';

class WishlistItem extends Component {
  render() {
    const {
      item,
      isInCart,
      isPrivate,
      t,
    } = this.props;

    return (
      <li className="b-cart__item">
        <div className="b-cart__item__col-img">
          <Image
            className="b-cart__item_img"
            image={item.good.image}
            maxHeight={143}
            maxWidth={143}
          />
        </div>
        <div className="b-cart__item__col-content">
          <h2 className="b-cart__item__title">
            <a
              href={item.good.defaultUrl}
              target="_blank"
            >
              {item.product.title}
            </a>
          </h2>
          <GoodDetails details={item.good.customAttributes} />
        </div>
        <div className="b-cart__item__col-quantity" />
        <div className="b-cart__item__col-price">
          <div className="b-cart__item__price">
            {item.good.price != null
              ? humanizedMoneyWithCurrency(item.good.price)
              : t('vendor.wishlist.no_price')
            }
          </div>
          {item.good.hasOrderingGoods && (
            <WishlistAddToCartButton
              href={item.good.addToCartUrl}
              id={item.good.id}
              isInCart={isInCart}
              t={t}
              title={item.good.title}
            />
          )}
        </div>
        {isPrivate && (
          <div className="b-cart__item__col-remove">
            <a
              className="b-cart__item__remove"
              data-method="delete"
              href={item.destroyUrl}
            >
              <AssetImage src="images/cross_white.svg" />
            </a>
          </div>
        )}
      </li>
    );
  }
}

WishlistItem.propTypes = {
  isInCart: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  item: schemas.wishlistItem,
  t: PropTypes.func.isRequired,
};

export default WishlistItem;
