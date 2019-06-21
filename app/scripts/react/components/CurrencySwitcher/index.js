import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Url from 'domurl';

import CurrencySwitcher from './CurrencySwitcher';

class CurrencySwitcherContainer extends Component {
  handleChange(value) {
    const url = new Url(window.location.href)
    url.query['currency']=value
    window.location = url.toString()
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
