import React, { Component, PropTypes } from 'react';
import AssetImage from 'rc/common/AssetImage';
import { RelativeImage } from 'rc/common/Image';
import CartListPackagePrice from './CartListPackagePrice';
import { getIn } from 'timm';
import { map } from 'lodash';
import * as schemas from 'r/schemas';

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
        globalId,
        image,
        defaultUrl='',
        title='',
      },
    } = (this.props.item || {});
    const {
      changePackageCount,
      packageCount,
      packagePrice,
      t,
    } = this.props;

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
        <CartListPackagePrice
          {...{
            globalId,
            changePackageCount,
            packageCount,
            packagePrice,
            t,
          }}
        />
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
  changePackageCount: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  packageCount: PropTypes.number.isRequired,
  packagePrice: schemas.money,
  t: PropTypes.func.isRequired,
};

export default CartListPackageItem;
