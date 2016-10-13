import React, { Component, PropTypes } from 'react';
import ProductGroup from './ProductGroup';
import ProductBlock from 'rc/Product/ProductBlock';
import CatalogFilterContainer from 'rc/CatalogFilter';

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
  title: PropTypes.string,
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

export default ProductGroupContainer;
