import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { size, map, find } from 'lodash';
import * as schemas from 'r/schemas';
import { RelativeImage } from '../common/Image';
import { humanizedMoneyWithCurrency } from '../../helpers/money';
import CartListPackagePrice from './CartListPackagePrice';
import CartListImage from './CartListImage';
import { getIn } from 'timm';

const defaultPackage = {
  image: {},
  images: null,
};

class CartListPackages extends Component {
  componentDidMount() {
    CartListImage.initFancybox($(findDOMNode(this)), this.props.t);
  }
  renderRadioButton({ value, title, checked, key }) {
    const id = `cart_package_good_global_id_${value}`;

    return (
      <div className="b-form__radio" key={key}>
        <div className="form-group radio_buttons required">
          <span className="radio">
            <label htmlFor={id}>
              <input
                checked={checked}
                className="radio_buttons required"
                data-package="true"
                id={id}
                name="cart[package_good_global_id]"
                onChange={this.props.selectPackage.bind(this, value)}
                type="radio"
                value={value}
              />
              {title}
            </label>
          </span>
        </div>
      </div>
    );
  }
  renderTitle(item) {
    const {
      title='',
      price,
    } = item;

    return (
      <span>
        {title}
        {' - '}
        <b>
          {humanizedMoneyWithCurrency(price)}
        </b>
      </span>
    );
  }
  render() {
    const {
      changePackageCount,
      packageCount,
      packagePrice,
      packages,
      selectedPackage,
      t,
    } = this.props;

    if (size(packages) === 0) {
      return <noscript />;
    }

    const sPackage = find(packages, p => p.globalId === selectedPackage) || defaultPackage;
    const sImage = sPackage.image;
    const sImages = sPackage.images;

    return (
      <li className="b-cart__item_spec">
        <div className="b-cart__item">
          <div className="b-cart__item__col-img">
            {sImage.url && (
              <div>
                <a
                  data-lightbox
                  data-fancybox-group={sImage.productId}
                  href={sImage.url}
                >
                  <RelativeImage
                    className="b-cart__item__img"
                    image={sImage}
                    maxHeight={184}
                    maxWidth={184}
                  />
                </a>
                {CartListImage.fancyboxImages(sImage, sImages)}
              </div>
            )}
          </div>
          <div className="b-cart__item__col-content">
            <h2 className="b-cart__item__title">
              {t('vendor.packaging.add_gift_package')}
            </h2>
            {this.renderRadioButton({
              key: 'radio-button-default',
              value: '',
              title: t('vendor.packaging.no_package'),
              checked: !selectedPackage,
            })}
            {map(packages, (item, idx) => (
              this.renderRadioButton({
                key: `radio-button-${idx}`,
                title: this.renderTitle(item),
                value: item.globalId || '',
                checked: selectedPackage === item.globalId,
              })
            ))}
          </div>
          {!!selectedPackage && (
            <CartListPackagePrice
              {...{
                globalId: selectedPackage,
                changePackageCount,
                packageCount,
                packagePrice,
                t,
              }}
            />
          )}
        </div>
      </li>
    );
  }
}

CartListPackages.propTypes = {
  changePackageCount: PropTypes.func.isRequired,
  packageCount: PropTypes.number.isRequired,
  packagePrice: schemas.money,
  packages: PropTypes.array.isRequired,
  selectPackage: PropTypes.func.isRequired,
  selectedPackage: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default CartListPackages;
