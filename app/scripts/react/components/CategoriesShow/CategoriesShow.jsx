import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductList from 'rc/ProductList/ProductList';

class CategoriesShow extends Component {
  render() {
    const {
      container,
      isFilterDirty,
      nextButton,
      products,
      showNextButton,
      t,
      title,
      vendorRootPath,
      catalogFilterProps,
      showCartButton,
      showAuthForBuyButton,
      vendorClientSigninPath,
      showCatalogFilter,
      showPagination,
      showQuantity,
      historyProducts
    } = this.props;

    return products.items.length > 0 || isFilterDirty
      ? (
        <ProductList
          container={container}
          nextButton={nextButton}
          products={products}
          showNextButton={showNextButton}
          showPagination
          t={t}
          title={title}
          catalogFilterProps={catalogFilterProps}
          showCartButton={showCartButton}
          showAuthForBuyButton={showAuthForBuyButton}
          vendorClientSigninPath={vendorClientSigninPath}
          showCatalogFilter={showCatalogFilter}
          showPagination={showPagination}
          showQuantity={showQuantity}
          historyProducts={historyProducts}
        />
      )
      : (
        <div className="b-text b-text_center">
          <p>
            {t('vendor.category.empty')}
          </p>
          <a className="b-btn" href={vendorRootPath}>
            {t('vendor.category.continue_shopping')}
          </a>
        </div>
      );
  }
}

CategoriesShow.propTypes = {
  container: ProductList.propTypes.container,
  showCartButton: ProductList.propTypes.showCartButton,
  showAuthForBuyButton: PropTypes.bool,
  vendorClientSigninPath: PropTypes.string,
  showCatalogFilter: ProductList.propTypes.showCatalogFilter,
  showPagination: ProductList.propTypes.showPagination,
  showQuantity: ProductList.propTypes.showQuantity,
  catalogFilterProps: ProductList.propTypes.catalogFilterProps,
  isFilterDirty: PropTypes.bool,
  nextButton: PropTypes.object,
  products: PropTypes.object.isRequired,
  showNextButton: PropTypes.bool,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  vendorRootPath: PropTypes.string,
};

export default CategoriesShow;
