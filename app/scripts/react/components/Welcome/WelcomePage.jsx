import React, { Component } from 'react'; import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import WelcomeContainer from './index';
import CatalogFilterContainer from 'rc/CatalogFilter';
import * as schemas from 'r/schemas';

class WelcomePage extends Component {
  render() {
    const {
      catalogFilterProps,
      i18n,
      isFilterDirty,
      layoutProps,
      products,
      showCartButton,
      showCatalogFilter,
      showPaginationOnWelcome,
      showQuantity,
      showWelcomeSlider,
      vendor,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <WelcomeContainer
          catalogFilterProps={catalogFilterProps}
          i18n={i18n}
          isFilterDirty={isFilterDirty}
          products={products}
          showCartButton={showCartButton}
          showCatalogFilter={showCatalogFilter}
          showPaginationOnWelcome={showPaginationOnWelcome}
          showQuantity={showQuantity}
          showWelcomeSlider={showWelcomeSlider}
          vendor={vendor}
        />
      </VendorLayoutContainer>
    );
  }
}

WelcomePage.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  i18n: PropTypes.object,
  isFilterDirty: PropTypes.bool.isRequired,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  products: schemas.productList.isRequired,
  showCartButton: PropTypes.bool.isRequired,
  showCatalogFilter: PropTypes.bool.isRequired,
  showPaginationOnWelcome: PropTypes.bool.isRequired,
  showQuantity: PropTypes.bool.isRequired,
  showWelcomeSlider: PropTypes.bool.isRequired,
  vendor: schemas.vendor.isRequired,
};

export default WelcomePage;
