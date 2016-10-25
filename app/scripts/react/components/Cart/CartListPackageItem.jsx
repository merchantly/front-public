import React, { Component, PropTypes } from 'react';
import AssetImage from '../common/AssetImage';
import { RelativeImage } from '../common/Image';
import HumanizedMoneyWithCurrency from '../common/Money/HumanizedMoneyWithCurrency';
import { decamelizeKeys } from 'humps';
import { getIn } from 'timm';
import { map } from 'lodash';

class CartListPackageItem extends Component {
  renderGoodDetails() {
    const customAttributes = getIn(this.props.item, ['good', 'customAttributes']) || {};

    return map(customAttributes, (val, key) => (
      <div className="b-cart__item__option" key={`custom-attr-${key}`}>
        {`${key}: ${val}`}
      </div>
    ));
  }
  render() {
    const {
      destroyUrl='',
      good: {
        image,
        defaultUrl='',
        title='',
        actualPrice={},
      },
    } = (this.props.item || {});

    return (
      <li className="b-cart__item">
        <div className="b-cart__item__col-img">
          <RelativeImage
            className="b-cart__item__img"
            image={image || {}}
            maxHeight={92}
            maxWidth={92}
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
        </div>
        <div className="b-cart__item__col-quantity" />
        <div className="b-cart__item__col-price">
          <div className="b-cart__item__price">
            <HumanizedMoneyWithCurrency
              money={decamelizeKeys(actualPrice)}
            />
          </div>
        </div>
        <div className="b-cart__item__col-remove">
          <a
            className="b-cart__item__remove"
            data-method="delete"
            href={destroyUrl}
          >
            <AssetImage src="images/cross_white.svg" />
          </a>
        </div>
      </li>
    );
  }
}

CartListPackageItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartListPackageItem;
