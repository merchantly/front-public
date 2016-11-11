
import React, { Component, PropTypes } from 'react';

import map from 'lodash/map';
import size from 'lodash/size';
import get from 'lodash/get';
import bind from 'lodash/bind';

import { getHTMLName } from '../../helpers/money';

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);

    this.handleChange = bind(this.handleChange, this);
  }
  handleChange(event) {
    this.props.onChange( get(event, 'target.value') );
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
        onChange={this.handleChange}
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
};

export default CurrencySwitcher;
