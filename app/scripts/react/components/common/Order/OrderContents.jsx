import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';
import { Image } from 'rc/common/Image';
import HumanizedMoneyWithCurrency from 'rc/common/Money/HumanizedMoneyWithCurrency';
import FaIcon from 'rc/common/FaIcon';
import * as schemas from 'r/schemas';
import {
  ORDER_IMG_SIZE,
} from 'r/constants/OrderConstants';

class OrderContents extends Component {
  renderPackageGood(packageGood, packagePrice) {
    const {
      defaultUrl: packageDefaultUrl,
      image: packageImage,
      title: packageTitle,
      quantityUnit: packageQuantityUnit,
    } = packageGood;

    return (
      <li className="b-cart__item">
        <div className="b-cart__item__col-img">
          <Image
            className="b-cart__item__img"
            hasFixedSize
            image={{ url: packageImage.url }}
            maxWidth={ORDER_IMG_SIZE}
          />
        </div>
        <div className="b-cart__item__col-content">
          <h2 className="b-cart__item__title">
            <a href={packageDefaultUrl} target="_blank">
              {packageTitle}
            </a>
          </h2>
        </div>
        <div className="b-cart__item__col-quantity">
          <span>
            {`1 ${packageQuantityUnit.short}`}
          </span>
        </div>
        <div className="b-cart__item__col-price">
          <div className="b-cart__item__price">
            <HumanizedMoneyWithCurrency money={packagePrice} />
          </div>
        </div>
      </li>
    );
  }
  renderCouponDiscount(coupon) {
    const {
      t,
    } = this.props;
    const {
      discount,
      fixed: isFixed,
      fixedDiscount,
      freeDelivery,
      discountPercents,
    } = coupon;

    return (
      <div className="text-warning">
        {discount.length > 0 && (
          <span>
            <FaIcon name="level-down" />
            {'\u2014'}
            {isFixed
              ? <HumanizedMoneyWithCurrency money={fixedDiscount} />
              : `${discountPercents} %`
            }
          </span>
        )}
        {freeDelivery && (
          <span data-tooltip={t('vendor.coupon.free_delivery')}>
            <FaIcon name="truck" />
          </span>
        )}
      </div>
    );
  }
  render() {
    const {
      order: {
        items,
        coupon,
        packageGood,
        packagePrice,
        totalWithDeliveryPrice,
        deliveryPrice,
      },
      t,
    } = this.props;

    return (
      <div className="b-cart__content">
        <h4>
          {t('vendor.order.contents')}
        </h4>
        <ul className="b-cart__list">
          {items.map((item) => <OrderItem item={item} t={t} key={`order-item-${item.good.id}`} />)}
          {packageGood && this.renderPackageGood(packageGood, packagePrice)}
          {coupon && (
            <li className="b-cart__item">
              <div className="b-cart__item__col-img" />
              <div className="b-cart__item__col-content">
                <h2 className="b-cart__item__title">
                  {t('vendor.order.discount')}
                </h2>
              </div>
              <div className="b-cart__item__col-quantity" />
              <div className="b-cart__item__col-price">
                <div className="b-cart__item__price">
                  {this.renderCouponDiscount(coupon)}
                </div>
              </div>
            </li>
          )}
          <li className="b-cart__item">
            <div className="b-cart__item__col-img" />
            <div className="b-cart__item__col-content">
              <h2 className="b-cart__item__title">
                {t('vendor.order.delivery_price')}
              </h2>
            </div>
            <div className="b-cart__item__col-quantity" />
            <div className="b-cart__item__col-price">
              <div className="b-cart__item__price">
                <HumanizedMoneyWithCurrency money={deliveryPrice} />
              </div>
            </div>
          </li>
        </ul>
        <div className="b-cart__total-sum">
          {t('vendor.cart.overall')}
          <span>
            <HumanizedMoneyWithCurrency money={totalWithDeliveryPrice} />
          </span>
        </div>
        <div className="b-cart__action" />
      </div>
    );
  }
}

OrderContents.propTypes = {
  order: schemas.order.isRequired,
  t: PropTypes.func.isRequired,
};

OrderContents.defaultProps = {
  order: {},
};

export default OrderContents;
