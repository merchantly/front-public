import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductList from 'rc/ProductList';
import CategoriesShowContainer from './index';
import VendorLayoutContainer from 'rc/VendorLayout';

class CategoriesShowPage extends Component {
  componentDidMount() {
    try {
      $(window).trigger('m.category', [this.props.products.items]);
    } catch (e) {
      console.log('trigger: ', e.message);
    }
  }

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
      showAuthForBuyButton,
      vendorClientSigninPath,
      showCatalogFilter,
      showPagination,
      showQuantity,
      showNextButton,
      nextButton,
      historyProducts
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
          showAuthForBuyButton={showAuthForBuyButton}
          vendorClientSigninPath={vendorClientSigninPath}
          showCatalogFilter={showCatalogFilter}
          showPagination={showPagination}
          showQuantity={showQuantity}
          showNextButton={showNextButton}
          nextButton={nextButton}
          historyProducts={historyProducts}
        />
      </VendorLayoutContainer>
    );
  }
}

CategoriesShowPage.propTypes = {
  container: ProductList.wrapped.propTypes.container,
  catalogFilterProps: ProductList.wrapped.propTypes.catalogFilterProps,
  showCartButton: ProductList.wrapped.propTypes.showCartButton,
  showAuthForBuyButton: PropTypes.bool,
  vendorClientSigninPath: PropTypes.string,
  showCatalogFilter: ProductList.wrapped.propTypes.showCatalogFilter,
  showPagination: ProductList.wrapped.propTypes.showPagination,
  showQuantity: ProductList.wrapped.propTypes.showQuantity,
  i18n: PropTypes.object,
  isFilterDirty: PropTypes.bool,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  products: ProductList.wrapped.propTypes.products,
  title: PropTypes.string,
  vendorRootPath: PropTypes.string,
  historyProducts: PropTypes.arrayOf(PropTypes.object),
};

CategoriesShowPage.defaultProps = {
  historyProducts: []
};

export default CategoriesShowPage;
