import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WelcomeChildren from './WelcomeChildren';
import * as schemas from 'r/schemas';
import provideTranslations from 'rc/HoC/provideTranslations';

class WelcomeChildrenContainer extends Component {
  render() {
    return <WelcomeChildren {...this.props} />;
  }
}

WelcomeChildrenContainer.propTypes = {
  childrenProducts: schemas.childrenProducts,
  showWelcomeSlider: PropTypes.bool,
  vendor: schemas.vendor,
  showCartButton: PropTypes.bool,
  showAuthForBuyButton: PropTypes.bool,
  vendorClientSigninPath: PropTypes.string,
  showCatalogFilter: PropTypes.bool,
  showQuantity: PropTypes.bool,
  rtl: PropTypes.bool.isRequired,
  historyProducts: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func.isRequired
};

WelcomeChildrenContainer.defaultProps = {
  showWelcomeSlider: false,
  vendor: {},
  rtl: false
};

export default provideTranslations(WelcomeChildrenContainer);
