import React, { Component, PropTypes } from 'react';
import CheckoutFieldSelect from './CheckoutFieldSelect';
import CheckoutFieldSelectAjax from './CheckoutFieldSelectAjax';

const STRING_TYPE = 'string';
const TEXTAREA_TYPE = 'textarea';
const HIDDEN_TYPE = 'hidden';
const SELECT_TYPE = 'select';
const AJAX_SELECT_TYPE = 'ajax_select';

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
      errorMessage='',
      name='',
      type=STRING_TYPE,
      placeholder='',
      isRequired,
      isDisabled,
      title='',
    } = field;
    const inputId = `vendor_order_${name}`;
    const inputFieldName = `vendor_order[${name}]`;

    switch(type) {
      case STRING_TYPE:
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
      case TEXTAREA_TYPE:
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
      case SELECT_TYPE:
        return (
          <CheckoutFieldSelect
            title={title}
            disabled={isDisabled}
            required={isRequired}
            id={inputId}
            name={name}
            value={value}
            inputName={inputFieldName}
            items={ajaxSettings.items}
            onChange={onChange}
            errorMessage={errorMessage}
            defaultTitle={ajaxSettings.defaultTitle}
          />
        );
        break;
      case AJAX_SELECT_TYPE:
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
            onChange={onChange}
            errorMessage={errorMessage}
            collectionUrl={ajaxSettings.collectionUrl}
            defaultTitle={ajaxSettings.defaultTitle}
          />
        );
        break;
      case HIDDEN_TYPE:
        return (
          <input
            type={HIDDEN_TYPE}
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
