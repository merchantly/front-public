
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import URI from 'urijs';

import CurrencySwitcher from './CurrencySwitcher';

class CurrencySwitcherContainer extends Component {
  handleChange(value) {
    window.location = new URI()
      .removeQuery('currency')
      .addQuery('currency', value)
      .toString();
  }
  render() {
    return (
      <CurrencySwitcher {...this.props} onChange={this.handleChange} />
    );
  }
}

CurrencySwitcherContainer.propTypes = {
  currenciesIsoCodes: PropTypes.array.isRequired,
  current: PropTypes.string,
};

CurrencySwitcherContainer.defaultProps = {
  currenciesIsoCodes: [],
  current: 'RUB',
};

export default CurrencySwitcherContainer;
