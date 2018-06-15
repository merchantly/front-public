import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HiddenInput extends Component {
  render() {
    return <input {...this.props} type="hidden" />;
  }
}

HiddenInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

export default HiddenInput;