import React, { Component, PropTypes } from 'react';
import CatalogFilterContainer from 'rc/CatalogFilter';
import VendorLayoutContainer from 'rc/VendorLayout';
import ProductSearchContainer from './index';
import * as schemas from 'r/schemas';

class ProductSearchPage extends Component {
  render() {
    const {
      catalogFilterProps,
      i18n,
      layoutProps,
      products,
      showCartButton,
      showCatalogFilter,
      showQuantity,
      vendorRootPath,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <ProductSearchContainer
          catalogFilterProps={catalogFilterProps}
          i18n={i18n}
          products={products}
          showCartButton={showCartButton}
          showCatalogFilter={showCatalogFilter}
          showQuantity={showQuantity}
          vendorRootPath={vendorRootPath}
        />
      </VendorLayoutContainer>
    );
  }
}

ProductSearchPage.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  products: schemas.productList.isRequired,
  showCatalogFilter: PropTypes.bool,
  showCartButton: PropTypes.bool,
  showQuantity: PropTypes.bool,
  vendorRootPath: PropTypes.string,
};

export default ProductSearchPage;
