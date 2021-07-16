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
      showAuthForBuyButton,
      vendorClientSigninPath,
      showCatalogFilter,
      showQuantity,
      rtl,
      historyProducts
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <WelcomeChildrenContainer
          childrenProducts={childrenProducts}
          showWelcomeSlider={showWelcomeSlider}
          vendor={vendor}
          showCartButton={showCartButton}
          showAuthForBuyButton={showAuthForBuyButton}
          vendorClientSigninPath={vendorClientSigninPath}
          showCatalogFilter={showCatalogFilter}
          showQuantity={showQuantity}
          rtl={rtl}
          historyProducts={historyProducts}
          i18n={i18n}
        />
      </VendorLayoutContainer>
    );
  }
}

WelcomeChildrenPage.propTypes = {
  childrenProducts: schemas.childrenProducts,
  showCartButton: PropTypes.bool,
  showAuthForBuyButton: PropTypes.bool,
  vendorClientSigninPath: PropTypes.string,
  showCatalogFilter: PropTypes.bool,
  showQuantity: PropTypes.bool,
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  showWelcomeSlider: PropTypes.bool,
  vendor: schemas.vendor,
  rtl: PropTypes.bool.isRequired,
  historyProducts: PropTypes.arrayOf(PropTypes.object),
};

WelcomeChildrenPage.defaultProps = {
  rtl: false,
  historyProducts: []
}

export default WelcomeChildrenPage;
