import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Select extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
  }
  hasOptionWithValue(value) {
    return this.props.options.some((o) => o.value === value);
  }
  handleChange(e) {
    if (this.props.onChange) {
      const srcValue = e.target.value;
      // Могут быть значения опций "333", 333, "17.5".
      // Сначала ищем как строку, если не нашли то это числовой идентификатор и приводим
      // с parseInt
      const value = this.hasOptionWithValue(srcValue) ? srcValue : parseInt(srcValue, 10);
      this.props.onChange(value);
    }
  }
  render() {
    const { name, options, value } = this.props;

    return (
      <select
        name={name}
        onChange={this.handleChange.bind(this)}
        value={value}
      >
        {
          options.map((option) =>
            <option {...option} key={option.value}>
              {option.title}
            </option>
          )
        }
      </select>
    );
  }
}