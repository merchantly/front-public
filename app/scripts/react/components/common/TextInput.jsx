import React, { Component } from 'react'; import PropTypes from 'prop-types';

export default class TextInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }
  render() {
    return (
      <input {...this.props} type="text" />
    );
  }
}