import React, { Component, PropTypes } from 'react';
import VendorLayoutContainer from 'rc/VendorLayout';
import WelcomeChildrenContainer from './index';
import * as schemas from 'r/schemas';

class WelcomeChildrenPage extends Component {
  render() {
    const {
      childrenProducts,
      i18n,
      layoutProps,
      showWelcomeSlider,
      vendor,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <WelcomeChildrenContainer
          childrenProducts={childrenProducts}
          showWelcomeSlider={showWelcomeSlider}
          vendor={vendor}
        />
      </VendorLayoutContainer>
    );
  }
}

WelcomeChildrenPage.propTypes = {
  childrenProducts: schemas.childrenProducts,
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  showWelcomeSlider: PropTypes.bool,
  vendor: schemas.vendor,
};

export default WelcomeChildrenPage;
