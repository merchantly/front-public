import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WelcomeChildren from './WelcomeChildren';
import * as schemas from 'r/schemas';

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
  showCatalogFilter: PropTypes.bool,
  showQuantity: PropTypes.bool
};

WelcomeChildrenContainer.defaultProps = {
  showWelcomeSlider: false,
  vendor: {},
};

export default WelcomeChildrenContainer;
