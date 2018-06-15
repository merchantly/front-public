import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckoutFieldSelect from './CheckoutFieldSelect';
import CheckoutFieldSelectAjax from './CheckoutFieldSelectAjax';
import fieldTypes from '../../schemas/checkoutFieldTypes';

class CheckoutField extends Component {
  render() {
    const {
      field,
      value,
      onChange,
      requestData,
    } = this.props;
    const {
      ajaxSettings = {},
      settings = {},
      errorMessage='',
      name='',
      type=fieldTypes.string,
      placeholder='',
      isRequired,
      isDisabled,
      title='',
    } = field;
    const inputId = `vendor_order_${name}`;
    const inputFieldName = `vendor_order[${name}]`;

    switch(type) {
      case fieldTypes.string:
        return (
          <div className="form-group string">
            <label className="string control-label" htmlFor={inputId}>
              {title}
            </label>
            <input
              className="string form-control"
              disabled={isDisabled}
              id={inputId}
              name={inputFieldName}
              onChange={(ev) => onChange(name, ev.target.value)}
              placeholder={placeholder}
              required={isRequired}
              type="text"
              value={value}
            />
            {errorMessage &&
              <span className="help-block">{errorMessage}</span>
            }
          </div>
        );
        break;
      case fieldTypes.textarea:
        return (
          <div className="form-group text">
            <label className="text control-label" htmlFor={inputId}>
              {title}
            </label>
            <textarea
              className="text form-control"
              disabled={isDisabled}
              required={isRequired}
              id={inputId}
              name={inputFieldName}
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
      case fieldTypes.select:
        return (
          <CheckoutFieldSelect
            title={title}
            disabled={isDisabled}
            required={isRequired}
            id={inputId}
            name={name}
            value={value}
            inputName={inputFieldName}
            items={settings.items}
            onChange={onChange}
            errorMessage={errorMessage}
            defaultTitle={settings.defaultTitle}
          />
        );
        break;
      case fieldTypes.ajax_select:
        return (
          <CheckoutFieldSelectAjax
            requestData={requestData}
            required={isRequired}
            title={title}
            disabled={isDisabled}
            id={inputId}
            name={name}
            inputName={inputFieldName}
            belongs={ajaxSettings.belongs}
            requiredTitle={ajaxSettings.requiredTitle}
            loadingTitle={ajaxSettings.loadingTitle}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            collectionUrl={ajaxSettings.collectionUrl}
            defaultTitle={ajaxSettings.defaultTitle}
          />
        );
        break;
      case fieldTypes.hidden:
        return (
          <input
            type='hidden'
            id={inputId}
            name={inputFieldName}
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
  field: PropTypes.object.isRequired,
  isRequired: PropTypes.bool,
  value:  PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  onChange: PropTypes.func.isRequired,
};

CheckoutField.defaultProps = {
};

export default CheckoutField;
