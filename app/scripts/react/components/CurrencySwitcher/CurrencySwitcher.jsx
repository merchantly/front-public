import React, { Component } from 'react';
import PropTypes from 'prop-types';

import map from 'lodash/map';
import size from 'lodash/size';

import { getHTMLName } from '../../helpers/money';

class CurrencySwitcher extends Component {
  handleChange(event) {
    this.props.onChange(event.target.value);
  }
  render() {
    const { currenciesIsoCodes, current } = this.props;

    if (size(currenciesIsoCodes) < 2) {
      return false;
    }

    return (
      <select
        className="CurrencySwitcher"
        defaultValue={current}
        onChange={this.handleChange.bind(this)}
      >
        {map(currenciesIsoCodes, (isoCode) =>
          <option key={isoCode} value={isoCode}>
            {getHTMLName(isoCode)}
          </option>
        )}
      </select>
    );
  }
}

CurrencySwitcher.propTypes = {
  currenciesIsoCodes: PropTypes.array.isRequired,
  current: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CurrencySwitcher;
