import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      showCartButton,
      showCatalogFilter,
      showQuantity
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <WelcomeChildrenContainer
          childrenProducts={childrenProducts}
          showWelcomeSlider={showWelcomeSlider}
          vendor={vendor}
          showCartButton={showCartButton}
          showCatalogFilter={showCatalogFilter}
          showQuantity={showQuantity}
        />
      </VendorLayoutContainer>
    );
  }
}

WelcomeChildrenPage.propTypes = {
  childrenProducts: schemas.childrenProducts,
  showCartButton: PropTypes.bool,
  showCatalogFilter: PropTypes.bool,
  showQuantity: PropTypes.bool,
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  showWelcomeSlider: PropTypes.bool,
  vendor: schemas.vendor,
};

export default WelcomeChildrenPage;
