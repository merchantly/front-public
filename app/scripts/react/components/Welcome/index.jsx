import React, { Component } from 'react'; import PropTypes from 'prop-types';
import * as schemas from 'r/schemas';
import Welcome from './Welcome';
import CatalogFilterContainer from 'rc/CatalogFilter';
import provideTranslations from 'rc/HoC/provideTranslations';

class WelcomeContainer extends Component {
  render() {
    return <Welcome {...this.props} />;
  }
}

WelcomeContainer.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  i18n: PropTypes.object,
  isFilterDirty: PropTypes.bool.isRequired,
  products: schemas.productList.isRequired,
  showCartButton: PropTypes.bool.isRequired,
  showCatalogFilter: PropTypes.bool.isRequired,
  showPaginationOnWelcome: PropTypes.bool.isRequired,
  showQuantity: PropTypes.bool.isRequired,
  showWelcomeSlider: PropTypes.bool.isRequired,
  vendor: schemas.vendor.isRequired,
  t: PropTypes.func.isRequired,
};

WelcomeContainer.defaultProps = {
  isFilterDirty: false,
  products: {
    items: [],
    pagination: {},
  },
  showCartButton: false,
  showCatalogFilter: false,
  showPaginationOnWelcome: false,
  showQuantity: false,
  showWelcomeSlider: false,
  vendor: {},
};

export default provideTranslations(WelcomeContainer);
