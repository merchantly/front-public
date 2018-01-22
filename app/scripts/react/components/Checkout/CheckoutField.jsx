import React, { Component, PropTypes } from 'react';
import { camelize } from 'humps';
import { getIn } from 'timm';

const STRING_TYPE = 'string';
const TEXTAREA_TYPE = 'textarea';
const HIDDEN_TYPE = 'hidden';
const SELECT_TYPE = 'select';

class CheckoutField extends Component {
  render() {
    const {
      item,
      value,
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
      case SELECT_TYPE:
        const options =
          getIn(deliveryType, ['options', camelize(name)]).
          map((option) => <option key={option.id} value={option.id}>{option.title}</option>);
        itemContent = (
          <div className="b-item-full__form__option  b-item-full__form__option_full b-item-full__form__option_pln">
            <label className="text control-label" htmlFor={itemId}>
              {title}
            </label>
            <select
              disabled={isDisabled}
              id={itemId}
              name={itemName}
              onChange={(ev) => onChange(name, ev.target.value)}
              >
              {options}
             </select>
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
      default:
        itemContent = (
          <div>Unknown field type {type}</div>
        );
    }

    console.log('CheckoutField', type, itemId, itemName, value);
    return itemContent;
  }
}

CheckoutField.propTypes = {
  deliveryType: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  value:  PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  onChange: PropTypes.func.isRequired,
};

CheckoutField.defaultProps = {
};

export default CheckoutField;
