/*global gon */
import React, { Component, PropTypes } from 'react';
import AssetImage from '../common/AssetImage';
import Select from '../common/Select';
import HumanizedMoneyWithCurrency from '../common/Money/HumanizedMoneyWithCurrency';
import {
  range,
  map,
  size,
} from 'lodash';
import { getIn } from 'timm';
import {
  ORDER_IMG_SIZE,
} from 'r/constants/OrderConstants';
import CartListImage from './CartListImage';
import tinycolor from 'tinycolor2';

const WEIGHT_STEP = 0.01;

class CartListItem extends Component {
  changeWeight(ev) {
    const {
      changeAmount,
      item,
    } = this.props;
    const floatVal = parseFloat(ev.target.value) ||
      parseFloat(getIn(item, ['good', 'weightOfPrice']) || 0);

    changeAmount(item.id, floatVal);
  }
  changeCount(count) {
    const {
      changeAmount,
      item,
    } = this.props;

    changeAmount(item.id, count);
  }
  renderGoodDetails() {
    const customAttributes = getIn(this.props.item, ['good', 'customAttributes']);
    const attributes = getIn(this.props.item, ['good', 'attributes']);    

    if (attributes) {
      return map(attributes, (attr) => (
        <div className="b-item-full__multiple-choice_colored-attribute" style={{backgroundColor: attr.colorHex,
                     background: `linear-gradient(to right, ${attr.colorHex}, ${attr.colorHex}, #ffffff)`,
                     color: tinycolor(attr.colorHex).isLight() ? 'black' : 'white'                     
                    }}>
          {`${attr.title}: ${attr.value}`}
        </div>          
      ));
    }

    if (customAttributes) {
      return map(customAttributes, (val, key) => (
        <div className="b-cart__item__option" key={`custom-attr-${key}`}>
          {`${key}: ${val}`}
        </div>
      ));
    }
  }
  renderErrors() {
    const errors = this.props.item.errors || {};

    return (
      <div className="b-alert b-alert_danger">
        {map(errors, (err, key) => (
          <p key={`cart-list-item-error-${key}`}>
            {err.join(', ')}
          </p>
        ))}
      </div>
    );
  }
  renderWeight() {
    const {
      amount,
      item,
      t,
    } = this.props;

    return (
      <div className="b-cart__item__col-weight">
        {getIn(item, ['good', 'hasOrderingGoods'])
          ? (
            <span>
              <span className="b-cart__item__weight__text">
                {t('vendor.cart.weight')}
              </span>
              <div className="b-cart__item__quantity__input">
                <input
                  defaultValue={amount}
                  min={WEIGHT_STEP}
                  name={`cart[items][${item.id}][weight]`}
                  onChange={this.changeWeight.bind(this)}
                  step={(WEIGHT_STEP).toString()}
                  type="number"
                />
              </div>
            </span>
          )
          : (
          <button className="b-btn" disabled>
            {t('vendor.cart.not_available')}
          </button>
          )
        }
      </div>
    );
  }
  renderQuantity() {
    const {
      amount,
      item,
      t,
    } = this.props;

    const maxAvail = Math.min(
      gon.max_items_count,
      (getIn(item, ['good', 'maxOrderableQuantity']) || 0)
    );
    const options = range(0, Math.max(amount, maxAvail))
      .map((i) => ({
        value: i + 1,
        title: i + 1,
        disabled: i + 1 > maxAvail,
      }));

    return (
      <div className="b-cart__item__col-quantity">
        {getIn(item, ['good', 'hasOrderingGoods'])
          ? (
            <span>
              <span className="b-cart__item__quantity__text">
                {t('vendor.cart.amount')}
              </span>
              <div className="b-cart__item__quantity__select">
                <Select
                  name={`cart[items][${item.id}][count]`}
                  onChange={this.changeCount.bind(this)}
                  options={options}
                  value={amount}
                />
              </div>
            </span>
          )
          : (
          <button className="b-btn" disabled>
            {t('vendor.cart.not_available')}
          </button>
          )
        }
      </div>
    );
  }
  render() {
    const {
      item,
      price,
      t,
    } = this.props;
    const {
      image,
      images=[],
      defaultUrl='',
      title='',
      sellingByWeight=false,
    } = (item.good || {});

    return (
      <li className="b-cart__item">
        <div className="b-cart__item__col-img">
          <CartListImage
            image={image}
            images={images}
            size={ORDER_IMG_SIZE}
            t={t}
          />
        </div>
        <div className="b-cart__item__col-content">
          <h2 className="b-cart__item__title">
            <a
              href={defaultUrl}
              target="_blank"
            >
              {title}
            </a>
          </h2>          
          {this.renderGoodDetails()}
          {(size(item.errors) > 0) && this.renderErrors()}
        </div>
        {sellingByWeight
          ? this.renderWeight()
          : this.renderQuantity()
        }
        <div className="b-cart__item__col-price">
          <div className="b-cart__item__price">
            <HumanizedMoneyWithCurrency money={price} />
          </div>
        </div>
        <div className="b-cart__item__col-remove">
          <a
            className="b-cart__item__remove"
            data-method="delete"
            href={item.destroyPath || ''}
          >
            <AssetImage src="images/cross_white.svg" />
          </a>
        </div>
      </li>
    );
  }
}

CartListItem.propTypes = {
  amount: PropTypes.number.isRequired,
  changeAmount: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  price: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default CartListItem;
