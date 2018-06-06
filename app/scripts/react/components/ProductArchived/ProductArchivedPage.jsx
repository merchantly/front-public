import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import ProductArchivedContainer from './index';
import * as schemas from 'r/schemas';

class ProductArchivedPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      product,
      searchProductsPath,
      vendorCategoryPath,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <ProductArchivedContainer
          i18n={i18n}
          product={product}
          searchProductsPath={searchProductsPath}
          vendorCategoryPath={vendorCategoryPath}
        />
      </VendorLayoutContainer>
    );
  }
}

ProductArchivedPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  product: schemas.product.isRequired,
  searchProductsPath: PropTypes.string.isRequired,
  vendorCategoryPath: PropTypes.string,
};

export default ProductArchivedPage;
