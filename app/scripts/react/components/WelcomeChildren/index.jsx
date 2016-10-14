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
};

WelcomeChildrenContainer.defaultProps = {
  showWelcomeSlider: false,
  vendor: {},
};

export default WelcomeChildrenContainer;
