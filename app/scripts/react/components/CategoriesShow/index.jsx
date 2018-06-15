import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoriesShow from './CategoriesShow';
import ProductList from 'rc/ProductList';
import provideTranslations from 'rc/HoC/provideTranslations';
import * as schemas from 'r/schemas';

class CategoriesShowContainer extends Component {
  render() {
    return <CategoriesShow {...this.props} />;
  }
}

CategoriesShowContainer.propTypes = {
  container: schemas.container.isRequired,
  catalogFilterProps: ProductList.wrapped.propTypes.catalogFilterProps,
  showCartButton: ProductList.wrapped.propTypes.showCartButton,
  showCatalogFilter: ProductList.wrapped.propTypes.showCatalogFilter,
  showPagination: ProductList.wrapped.propTypes.showPagination,
  showQuantity: ProductList.wrapped.propTypes.showQuantity,
  i18n: PropTypes.object,
  isFilterDirty: PropTypes.bool,
  products: ProductList.wrapped.propTypes.products,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  vendorRootPath: PropTypes.string,
};

CategoriesShowContainer.defaultProps = {
  container: {},
  products: {
    items: [],
    pagination: {},
  },
  isFilterDirty: false,
};

export default provideTranslations(CategoriesShowContainer);
