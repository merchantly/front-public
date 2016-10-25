import React, { Component, PropTypes } from 'react';
import { RelativeImage } from '../common/Image';
import { humanizedMoneyWithCurrency } from '../../helpers/money';
import { decamelizeKeys } from 'humps';
import { size, map } from 'lodash';
import { getIn } from 'timm';

class CartListPackages extends Component {
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
          {humanizedMoneyWithCurrency(decamelizeKeys(price))}
        </b>
      </span>
    );
  }
  render() {
    const {
      packages,
      selectedPackage,
      t,
    } = this.props;

    if (size(packages) === 0) {
      return <noscript />;
    }

    return (
      <li className="b-cart__item_spec">
        <div className="b-cart__item">
          <div className="b-cart__item__col-img">
            <RelativeImage
              className="b-cart__item__img"
              image={getIn(packages, [0, 'image'])}
              maxHeight={184}
              maxWidth={184}
            />
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
        </div>
      </li>
    );
  }
}

CartListPackages.propTypes = {
  packages: PropTypes.array.isRequired,
  selectPackage: PropTypes.func.isRequired,
  selectedPackage: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default CartListPackages;
