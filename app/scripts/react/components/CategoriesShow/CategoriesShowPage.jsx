import React, { Component, PropTypes } from 'react';
import ProductList from 'rc/ProductList';
import CategoriesShowContainer from './index';
import VendorLayoutContainer from 'rc/VendorLayout';

class CategoriesShowPage extends Component {
  render() {
    const {
      container,
      i18n,
      isFilterDirty,
      layoutProps,
      products,
      title,
      vendorRootPath,
      catalogFilterProps,
      showCartButton,
      showCatalogFilter,
      showPagination,
      showQuantity,
      showNextButton,
      nextButton
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <CategoriesShowContainer
          container={container}
          i18n={i18n}
          isFilterDirty={isFilterDirty}
          products={products}
          title={title}
          vendorRootPath={vendorRootPath}
          catalogFilterProps={catalogFilterProps}
          showCartButton={showCartButton}
          showCatalogFilter={showCatalogFilter}
          showPagination={showPagination}
          showQuantity={showQuantity}
          showNextButton={showNextButton}
          nextButton={nextButton}
        />
      </VendorLayoutContainer>
    );
  }
}

CategoriesShowPage.propTypes = {
  container: ProductList.wrapped.propTypes.container,
  catalogFilterProps: ProductList.wrapped.propTypes.catalogFilterProps,
  showCartButton: ProductList.wrapped.propTypes.showCartButton,
  showCatalogFilter: ProductList.wrapped.propTypes.showCatalogFilter,
  showPagination: ProductList.wrapped.propTypes.showPagination,
  showQuantity: ProductList.wrapped.propTypes.showQuantity,
  i18n: PropTypes.object,
  isFilterDirty: PropTypes.bool,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  products: ProductList.wrapped.propTypes.products,
  title: PropTypes.string,
  vendorRootPath: PropTypes.string,
};

CategoriesShowPage.defaultProps = {

};

export default CategoriesShowPage;
