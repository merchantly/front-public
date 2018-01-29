import React, { Component, PropTypes } from 'react';
import provideTranslations from 'rc/HoC/provideTranslations';

class CheckoutFieldSelect extends Component {
  render() {
    const {
      id,
      title,
      disabled,
      name,
      itemName,
      items,
      onChange,
      errorMessage,
      defaultTitle,
      value
    } = this.props;

    const myOnChange = (ev) => onChange(name, ev.target.value);
    const options = items.map( (item) => <option key={item.id} value={item.id} disabled={item.disabled}>{item.title}</option>);

    return (
      <div className="b-item-full__form__option  b-item-full__form__option_full b-item-full__form__option_pln">
        <label className="text control-label" htmlFor={id}>{title}</label>
        <select
          disabled={disabled}
          defaultValue={value}
          id={id}
          name={itemName}
          onChange={myOnChange}
        >
          {defaultTitle && <option value="" disabled>{defaultTitle}</option>}
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
};

CheckoutFieldSelect.defaultProps = {
};

export default provideTranslations(CheckoutFieldSelect);
