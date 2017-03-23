import React, { Component, PropTypes } from 'react';
import { camelize } from 'humps';
import { getIn } from 'timm';

const STRING_TYPE = 'string';
const TEXTAREA_TYPE = 'textarea';
const HIDDEN_TYPE = 'hidden';

class CheckoutFields extends Component {
  renderItem(item, value) {
    const {
      deliveryType,
      onChange,
    } = this.props;
    const {
      errorMessage='',
      name='',
      type=STRING_TYPE,
      placeholder='',
      title='',
    } = item;
    // const isRequired = includes(deliveryType.requiredFields || [], name);
    const reservedValue = getIn(deliveryType, ['reservedFieldValues', camelize(name)]);
    const isDisabled = !!reservedValue;
    const itemId = `vendor_order_${name}`;
    const itemName = `vendor_order[${name}]`;

    let itemContent = null;
    switch(type) {
      case STRING_TYPE:
        itemContent = (
          <div className="form-group string">
            <label className="string control-label" htmlFor={itemId}>
              {title}
            </label>
            <input
              className="string form-control"
              disabled={isDisabled}
              id={itemId}
              name={itemName}
              onChange={(ev) => onChange(name, ev.target.value)}
              placeholder={placeholder}
              type="text"
              value={reservedValue || value}
            />
            {errorMessage &&
              <span className="help-block">{errorMessage}</span>
            }
          </div>
        );
        break;
      case TEXTAREA_TYPE:
        itemContent = (
          <div className="form-group text">
            <label className="text control-label" htmlFor={itemId}>
              {title}
            </label>
            <textarea
              className="text form-control"
              disabled={isDisabled}
              id={itemId}
              name={itemName}
              onChange={(ev) => onChange(name, ev.target.value)}
              placeholder={placeholder}
              value={value}
            />
            {errorMessage &&
              <span className="help-block">{errorMessage}</span>
            }
          </div>
        );
        break;
      case HIDDEN_TYPE:
        itemContent = (
          <input
            type={HIDDEN_TYPE}
            id={itemId}
            name={itemName}
            value={value}
          />
        );
        break;
    }

    return (
      <div className="b-form__row__widget" key={name}>
        {itemContent}
      </div>
    );
  }
  render() {
    const {
      items,
      itemValues,
    } = this.props;

    return (
      <span>
        {items.map((item) => {
          const value = getIn(itemValues, [item.name, 'value']);

          return this.renderItem(item, value);
        })}
      </span>
    );
  }
}

CheckoutFields.propTypes = {
  deliveryType: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  itemValues: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

CheckoutFields.defaultProps = {
};

export default CheckoutFields;
