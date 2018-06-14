import React, { Component } from 'react'; import PropTypes from 'prop-types';
import classNames from 'classnames';

function selectFile(name, text, onChange) {
  return class SelectFile extends Component {
    static propTypes = {
      withText: PropTypes.bool,
      className: PropTypes.string,
    }
    render() {
      return (
        <label
          className={classNames('select-file', this.props.className)}
          htmlFor={name}
        >
          {this.props.withText && text}
          <input
            accept="image/*"
            className="select-file__input"
            id={name}
            onChange={onChange}
            type="file"
          />
        </label>
      );
    }
  };
}

export default class DesignSettingsAttach extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.string,
    children: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };
  renderBox() {
    if (this.props.value) {
      return (
        <div className="design-settings__attach-box">
          <span onClick={this.handleDelete.bind(this)}>
            <i className="design-settings__attach-delete" />
          </span>
          <img
            className="design-settings__attach-img"
            src={this.props.value}
          />
        </div>
      );
    }
  }
  getSelectText() {
    const { value } = this.props;
    return value ? 'Выбрать другой файл...' : 'Выбрать файл...';
  }
  handleChange(e) {
    this.props.onChange(e.target.files[0]);
  }
  handleDelete() {
    this.props.onChange(null);
  }
  render() {
    const { name, children } = this.props;
    const selectText = this.getSelectText();

    return (
      <div className={classNames('design-settings__attach', this.props.className)}>
        {this.renderBox()}
        {children && children(selectFile(name, selectText, this.handleChange.bind(this)))}
      </div>
    );
  }
}
