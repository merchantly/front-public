import React, { Component, PropTypes } from 'react';
import CheckoutFieldSelect from './CheckoutFieldSelect';
import CheckoutFieldSelectAjax from './CheckoutFieldSelectAjax';
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
      belongsData,
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

    switch(type) {
      case STRING_TYPE:
        return (
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
        return (
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
        const options = getIn(deliveryType, ['selects', camelize(name)]);
        switch (options.type) {
          case 'options':
            return (
              <CheckoutFieldSelect
                title={title}
                disabled={isDisabled}
                id={itemId}
                name={name}
                value={value}
                itemName={itemName}
                items={options.items}
                onChange={onChange}
                errorMessage={errorMessage}
                defaultTitle={options.defaultTitle}
              />
          );
          case 'ajax':
            const requestData = { ...belongsData, vendor_delivery_id: deliveryType.id };

            return (
              <CheckoutFieldSelectAjax
                requestData={requestData}
                title={title}
                disabled={isDisabled}
                id={itemId}
                name={name}
                itemName={itemName}
                belongs={options.belongs}
                requiredTitle={options.requiredTitle}
                loadingTitle={options.loadingTitle}
                onChange={onChange}
                errorMessage={errorMessage}
                collectionUrl={options.collectionUrl}
                defaultTitle={options.defaultTitle}
              />
          );
          default:
            return (
              <div>UNKNOWN select field type "{options['type']}"</div>
          )
        };
      case HIDDEN_TYPE:
        return (
          <input
            type={HIDDEN_TYPE}
            id={itemId}
            name={itemName}
            value={value}
          />
        );
        break;
      default:
        return (
          <div>Unknown field type '{type}'</div>
        );
    }
  }
}

CheckoutField.propTypes = {
  deliveryType: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  belongsData: PropTypes.object,
  value:  PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  onChange: PropTypes.func.isRequired,
};

CheckoutField.defaultProps = {
};

export default CheckoutField;
