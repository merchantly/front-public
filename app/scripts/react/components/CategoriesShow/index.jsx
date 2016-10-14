import React, { Component, PropTypes } from 'react';
import CategoriesShow from './CategoriesShow';
import ProductList from 'rc/ProductList';
import provideTranslations from 'rc/HoC/provideTranslations';

class CategoriesShowContainer extends Component {
  render() {
    return <CategoriesShow {...this.props} />;
  }
}

CategoriesShowContainer.propTypes = {
  container: ProductList.wrapped.propTypes.container,
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
