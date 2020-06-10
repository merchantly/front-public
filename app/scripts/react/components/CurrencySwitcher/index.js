import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouAreI from 'youarei';

import CurrencySwitcher from './CurrencySwitcher';

class CurrencySwitcherContainer extends Component {
  handleChange(value) {
    const url = new YouAreI(window.location.href);
    url.query_set({currency: value});
    document.location = url.to_string();
  }
  render() {
    return (
      <CurrencySwitcher {...this.props} onChange={this.handleChange.bind(this)} />
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
