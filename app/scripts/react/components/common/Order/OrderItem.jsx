import React, { Component } from 'react';
import { Image } from 'rc/common/Image';
import HumanizedMoneyWithCurrency from 'rc/common/Money/HumanizedMoneyWithCurrency';
import * as schemas from 'r/schemas';
import {
  ORDER_IMG_SIZE,
} from 'r/constants/OrderConstants';

class OrderItem extends Component {
  render() {
    const {
      item: {
        count,
        title,
        good: {
          defaultUrl,
          article,
        },
        imageUrl,
        totalPrice,
        quantityUnit,
      },
    } = this.props;

    return (
      <li className="b-cart__item">
        <div className="b-cart__item__col-img">
          <Image
            className="b-cart__item__img"
            hasFixedSize
            image={{ url: imageUrl }}
            maxWidth={ORDER_IMG_SIZE}
          />
        </div>
        <div className="b-cart__item__col-content">
          <h2 className="b-cart__item__title">
            <a href={defaultUrl} target="_blank">
              {title}
            </a>
          </h2>
          <div className="text-muted text-small">
            {article}
          </div>
        </div>
        <div className="b-cart__item__col-quantity">
          {`${count} ${quantityUnit.short}`}
        </div>
        <div className="b-cart__item__col-price">
          <div className="b-cart__item__price">
            <HumanizedMoneyWithCurrency money={totalPrice} />
          </div>
        </div>
      </li>
    );
  }
}

OrderItem.propTypes = {
  item: schemas.orderItem.isRequired,
};

OrderItem.defaultProps = {
  item: {
    good: {},
  },
};

export default OrderItem;
