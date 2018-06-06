import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DesignSettingsCheckbox extends Component {
  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  };
  handleChange(e) {
    this.props.onChange(e.target.checked);
  }
  render() {
    return (
      <label className="switcher">
        <input
          checked={this.props.value}
          className="switcher__input"
          onChange={this.handleChange.bind(this)}
          type="checkbox"
        />
        <span className="switcher__box">
          <span className="switcher__knob" />
        </span>
      </label>
    );
  }
}
