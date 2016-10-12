/*global gon */
import React, { Component, PropTypes } from 'react';
import { RelativeImage } from '../common/Image';
import AssetImage from '../common/AssetImage';
import Select from '../common/Select';
import HumanizedMoneyWithCurrency from '../common/Money/HumanizedMoneyWithCurrency';
import { Map } from 'immutable';
import { decamelizeKeys } from 'humps';
import {
  range,
} from 'lodash';
import {
  ORDER_IMG_SIZE,
} from 'r/constants/OrderConstants';

const emptyMap = Map();
const WEIGHT_STEP = 0.01;

class CartListItem extends Component {
  changeWeight(ev) {
    const {
      changeAmount,
      item,
    } = this.props;
    const floatVal = parseFloat(ev.target.value) ||
      parseFloat(item.getIn(['good', 'weightOfPrice'], 0));

    changeAmount(item.get('id'), floatVal);
  }
  changeCount(count) {
    const {
      changeAmount,
      item,
    } = this.props;

    changeAmount(item.get('id'), count);
  }
  renderGoodDetails() {
    const customAttributes = this.props.item.getIn(['good', 'customAttributes'], emptyMap);

    return customAttributes.map((val, key) => (
      <div className="b-cart__item__option" key={`custom-attr-${key}`}>
        {`${key}: ${val}`}
      </div>
    )).valueSeq();
  }
  renderErrors() {
    const errors = this.props.item.get('errors', emptyMap);

    return (
      <div className="b-alert b-alert_danger">
        {errors.map((err, key) => (
          <p key={`cart-list-item-error-${key}`}>
            {err.join(', ')}
          </p>
        )).valueSeq()}
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
        {item.getIn(['good', 'hasOrderingGoods'], false)
          ? (
            <span>
              <span className="b-cart__item__weight__text">
                {t('vendor.cart.weight')}
              </span>
              <div className="b-cart__item__quantity__input">
                <input
                  defaultValue={amount}
                  min={WEIGHT_STEP}
                  name={`cart[items][${item.get('id')}][weight]`}
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
      item.getIn(['good', 'maxOrderableQuantity'], 0)
    );
    const options = range(0, Math.max(amount, maxAvail))
      .map((i) => ({
        value: i + 1,
        title: i + 1,
        disabled: i + 1 > maxAvail,
      }));

    return (
      <div className="b-cart__item__col-quantity">
        {item.getIn(['good', 'hasOrderingGoods'], false)
          ? (
            <span>
              <span className="b-cart__item__quantity__text">
                {t('vendor.cart.amount')}
              </span>
              <div className="b-cart__item__quantity__select">
                <Select
                  name={`cart[items][${item.get('id')}][count]`}
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
    } = this.props;
    const priceObj = decamelizeKeys(price.toJS());

    return (
      <li className="b-cart__item">
        <div className="b-cart__item__col-img">
          <RelativeImage
            className="b-cart__item__img"
            image={item.getIn(['good', 'image'], Map()).toJS()}
            maxHeight={ORDER_IMG_SIZE}
            maxWidth={ORDER_IMG_SIZE}
          />
        </div>
        <div className="b-cart__item__col-content">
          <h2 className="b-cart__item__title">
            <a
              href={item.getIn(['good', 'defaultUrl'], '')}
              target="_blank"
            >
              {item.getIn(['good', 'title'], '')}
            </a>
          </h2>
          {this.renderGoodDetails()}
          {(item.get('errors', Map()).count() > 0) && this.renderErrors()}
        </div>
        {item.getIn(['good', 'sellingByWeight'], false)
          ? this.renderWeight()
          : this.renderQuantity()
        }
        <div className="b-cart__item__col-price">
          <div className="b-cart__item__price">
            <HumanizedMoneyWithCurrency money={priceObj} />
          </div>
        </div>
        <div className="b-cart__item__col-remove">
          <a
            className="b-cart__item__remove"
            data-method="delete"
            href={item.get('destroyPath', '')}
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
