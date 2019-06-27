import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouAreI from 'youarei';

import CurrencySwitcher from './CurrencySwitcher';

class CurrencySwitcherContainer extends Component {
  handleChange(e) {
    const url = new YouAreI(window.location.href);
    url.query_set({currency: e.target.value});
    window.location = url.to_string();
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
