import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductArchived from './ProductArchived';
import provideTranslations from 'rc/HoC/provideTranslations';
import * as schemas from 'r/schemas';

class ProductArchivedContainer extends Component {
  render() {
    return <ProductArchived {...this.props} />;
  }
}

ProductArchivedContainer.propTypes = {
  i18n: PropTypes.object,
  product: schemas.product.isRequired,
  searchProductsPath: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  vendorCategoryPath: PropTypes.string,
};

ProductArchivedContainer.defaultProps = {
  product: {},
};

export default provideTranslations(ProductArchivedContainer);
