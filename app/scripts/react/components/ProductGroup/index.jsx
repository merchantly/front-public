import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductGroup from './ProductGroup';
import ProductBlock from 'rc/Product/ProductBlock';
import CatalogFilterContainer from 'rc/CatalogFilter';
import provideTranslations from 'rc/HoC/provideTranslations';

class ProductGroupContainer extends Component {
  render() {
    return <ProductGroup {...this.props} />;
  }
}

ProductGroupContainer.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  i18n: PropTypes.object,
  products: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape(
      ...ProductBlock.wrapped.propTypes,
    )).isRequired,
  }).isRequired,
  showCartButton: PropTypes.bool.isRequired,
  showCatalogFilter: PropTypes.bool,
  showQuantity: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  vendorCategoryPath: PropTypes.string.isRequired,
};

ProductGroupContainer.defaultProps = {
  products: {
    items: [],
  },
  showCartButton: false,
  showCatalogFilter: false,
  showQuantity: false,
  title: '',
};

export default provideTranslations(ProductGroupContainer);
