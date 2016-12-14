import React, { Component, PropTypes } from 'react';
import ProductList from './ProductList';
import provideTranslations from 'rc/HoC/provideTranslations';
import * as schemas from 'r/schemas';
import CatalogFilterContainer from 'rc/CatalogFilter';

class ProductListContainer extends Component {
  render() {
    return <ProductList {...this.props} />;
  }
}

ProductListContainer.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  container: PropTypes.shape({
    image: schemas.image,
    description: PropTypes.string,
    bottomText: PropTypes.string,
  }),
  i18n: PropTypes.object,
  nextButton: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  products: schemas.productList.isRequired,
  showCartButton: PropTypes.bool,
  showCatalogFilter: PropTypes.bool,
  showNextButton: PropTypes.bool,
  showPagination: PropTypes.bool,
  showQuantity: PropTypes.bool,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
};

ProductListContainer.defaultProps = {
  products: {
    items: [],
    pagination: {},
  },
  showCartButton: false,
  showCatalogFilter: false,
  showNextButton: false,
  showPagination: false,
  showQuantity: false,
};

export default provideTranslations(ProductListContainer);
