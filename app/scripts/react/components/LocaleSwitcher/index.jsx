import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocaleSwitcher from './LocaleSwitcher';
import * as schemas from 'r/schemas';

class LocaleSwitcherContainer extends Component {
  handleChange(value) {
    window.location = value;
  }
  render() {
    return (
      <LocaleSwitcher {...this.props} onChange={this.handleChange} />
    );
  }
}

LocaleSwitcherContainer.propTypes = {
  locales: PropTypes.arrayOf(schemas.locale),
  current: PropTypes.string,
};

LocaleSwitcherContainer.defaultProps = {
  locales: [],
  current: 'ru',
};

export default LocaleSwitcherContainer;
