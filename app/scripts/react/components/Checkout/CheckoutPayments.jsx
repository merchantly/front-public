import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { simpleFormat } from '../../helpers/text';
import { find, isEmpty } from 'lodash';
import Checkbox from "../common/Checkbox";

class CheckoutPayments extends Component {
  itemFullTitle(item) {
    const paymentDiscounts = item.paymentDiscounts;

    if (paymentDiscounts && paymentDiscounts.length) {
      const deliveryTypeId = this.props.deliveryType.id;

      const paymentDiscount = find(
        paymentDiscounts,
        (pd) => pd.deliveryId === deliveryTypeId
      );

      if (paymentDiscount) {
        if(paymentDiscount.type == 'percent') {
          return this.props.t('vendor.payment_discount.percent', { title: item.title, discount: paymentDiscount.discount });
        } else {
          return this.props.t('vendor.payment_discount.fixed', { title: item.title, discount: paymentDiscount.discount });
        }
      }
    }

    return item.title;
  }

  renderItem(item) {
    const {
      current,
      itemFieldName,
      onChange,
    } = this.props;
    const {
      id: itemId,
      title='',
      showIcon,
      iconUrl='',
      description,
    } = item;
    const { id: currentId } = current;

    return (
      <div className="b-form__row__widget" key={itemId}>
        <span className="b-form__radio">
          <label>
            <input
              checked={!isEmpty(current) && itemId === currentId}
              className="form-control radio_buttons"
              name={`vendor_order[${itemFieldName}]`}
              onChange={() => onChange(item)}
              type="radio"
              value={itemId}
            />
            <div className="b-cart__form__payment-name">
              {this.itemFullTitle(item)}
              {!!showIcon && <img src={iconUrl} />}
            </div>
            <div
              className="b-cart__form__payment-description"
              dangerouslySetInnerHTML={{ __html: simpleFormat(description) }}
            />
          </label>
        </span>
      </div>
    );
  }
  render() {
    const {
      items,
      orderCreditAvailable,
      t
    } = this.props;

    return (
      <span>
        {items.map(item => this.renderItem(item))}
        {orderCreditAvailable &&
          <div className="form-group boolean">
            <span className="b-form__checkbox">
              <label className="boolean optional">
                <Checkbox
                  className="boolean m-r-sm"
                  defaultChecked={false}
                  id="vendor_order_is_credit"
                  name="vendor_order[is_credit]"
                  value="1"
                />
              </label>
              <span>{t('vendor.payment.is_credit')}</span>
            </span>
          </div>
        }
      </span>
    );
  }
}

CheckoutPayments.propTypes = {
  current: PropTypes.object.isRequired,
  itemFieldName: PropTypes.string,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  deliveryType: PropTypes.object.isRequired,
  orderCreditAvailable: PropTypes.bool,
  t: PropTypes.func.isRequired
};

CheckoutPayments.defaultProps = {
  itemFieldName: 'payment_type_id',
};

export default CheckoutPayments;
