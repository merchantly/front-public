import React, { Component, PropTypes } from 'react';
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
        downloadUrl,
        isDownloadingAvailable,
        good: {
          defaultUrl,
          article,
        },
        imageUrl,
        totalPrice,
        quantityUnit,
      },
      t,
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
          <div className="b-cart__item__title">
            <a href={defaultUrl} target="_blank">
              {title}
            </a>
          </div>
          <div className="text-muted text-small">
            {article}
          </div>
          {isDownloadingAvailable &&
            <div className="b-cart__item__download">
              <a href={downloadUrl} className="b-btn">
                {t('vendor.order.download_button')}
              </a>
            </div>
          }
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
  t: PropTypes.func.isRequired,
};

OrderItem.defaultProps = {
  item: {
    good: {},
  },
};

export default OrderItem;
