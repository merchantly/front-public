import React, { Component, PropTypes } from 'react';
import WidgetLayout from './WidgetLayout';
import provideTranslations from 'rc/HoC/provideTranslations';
import { layoutProps } from 'test/fixtures/welcome/page-sample.json';
import 'scripts/resources/gon';

class WidgetLayoutContainer extends Component {
  getChildContext() {
    return {
      isWidget: true,
    };
  }
  render() {
    return (
      <WidgetLayout {...this.props} {...layoutProps}/>
    );
  }
}

WidgetLayoutContainer.propTypes = {

};

WidgetLayoutContainer.defaultProps = {
  clientBarProps: {
    cartUrl: '/cart',
    showFullBasketCount: false,
    hasCart: true,
  },
  showClientBar: true,
};

WidgetLayoutContainer.childContextTypes = {
  isWidget: PropTypes.bool,
};

export default provideTranslations(WidgetLayoutContainer);
