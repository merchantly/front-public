import React, { Component } from 'react';
import PropTypes from 'prop-types';
import provideTranslations from 'rc/HoC/provideTranslations';
import { find } from 'lodash';

class CheckoutFieldSelect extends Component {
  render() {
    const {
      id,
      title,
      disabled,
      name,
      inputName,
      items,
      onChange,
      errorMessage,
      defaultTitle,
      value
    } = this.props;

    const myOnChange = (ev) => onChange(name, ev.target.value);
    const options = (items || []).map( (item) => <option key={item.id} value={item.id} disabled={item.disabled}>{item.title}</option>);
    const currentValue = !!find(items, (i) => value && i.id.toString() == value.toString()) ? value : '';

    return (
      <div className="b-item-full__form__option  b-item-full__form__option_full b-item-full__form__option_pln">
        <label className="text control-label" htmlFor={id}>{title}</label>
        <select
          disabled={disabled}
          defaultValue={currentValue || ''}
          id={id}
          name={inputName}
          onChange={myOnChange}
        >
          {defaultTitle && options.length>1 && <option value="" key="default" disabled={true}>{defaultTitle}</option>}
          {options}
        </select>
        {errorMessage &&
        <span className="help-block">{errorMessage}</span>
        }
      </div>
    );
  }
}

CheckoutFieldSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

CheckoutFieldSelect.defaultProps = {
  items: []
};

export default provideTranslations(CheckoutFieldSelect);
