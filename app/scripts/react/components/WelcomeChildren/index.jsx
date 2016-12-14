import React, { Component, PropTypes } from 'react';
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
  showCatalogFilter: PropTypes.bool,
  showQuantity: PropTypes.bool
};

WelcomeChildrenContainer.defaultProps = {
  showWelcomeSlider: false,
  vendor: {},
};

export default WelcomeChildrenContainer;
