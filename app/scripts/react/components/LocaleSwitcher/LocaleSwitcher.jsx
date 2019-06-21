import React, { Component } from 'react';
import PropTypes from 'prop-types';

import map from 'lodash-es/map';
import size from 'lodash-es/size';
import bind from 'lodash-es/bind';
import provideTranslations from '../HoC/provideTranslations';

class LocaleSwitcher extends Component {
  constructor(props) {
    super(props);

    this.handleChange = bind(this.handleChange, this);
  }
  handleChange(event) {
    this.props.onChange( this.props.locales[event.target.options.selectedIndex].url );
  }
  render() {
    const { locales, current, t } = this.props;

    if (size(locales) < 2) {
      return false;
    }

    return (
      <select
        className="LocaleSwitcher"
        defaultValue={current}
        onChange={this.handleChange}
      >
        {map(locales, (locale) =>
          <option data-url={locale.url} key={locale.lang} value={locale.lang}>
            {t('vendor.locales.' + locale.lang)}
          </option>
        )}
      </select>
    );
  }
}

LocaleSwitcher.propTypes = {
  locales: PropTypes.arrayOf(
    PropTypes.shape({
      lang: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
  current: PropTypes.string.isRequired,
};

export default provideTranslations(LocaleSwitcher);
