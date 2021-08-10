import React, { Component } from 'react';
import PropTypes from 'prop-types';

import map from 'lodash/map';
import size from 'lodash/size';
import bind from 'lodash/bind';
import provideTranslations from '../HoC/provideTranslations';

class LocaleSwitcher extends Component {
  constructor(props) {
    super(props);

    this.handleChange = bind(this.handleChange, this);
  }
  handleChange(event) {
    window.debug_event = event;
    console.log(event.target.selectedOptions[0])
    console.log(event.target.selectedOptions[0].getAttribute("data-url"))

    this.props.onChange( event.target.selectedOptions[0].getAttribute("data-url") );
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
