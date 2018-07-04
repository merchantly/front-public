import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SubmitInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }
  render() {
    return (
      <input {...this.props} type="submit" />
    );
  }
}