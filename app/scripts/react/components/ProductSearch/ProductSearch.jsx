import React, { Component, PropTypes } from 'react';
import ProductList from 'rc/ProductList/ProductList';
import CatalogFilterContainer from 'rc/CatalogFilter';
import ItemListCatalog from 'rc/ItemListCatalog';
import * as schemas from 'r/schemas';

class ProductSearch extends Component {
  render() {
    const {
      catalogFilterProps,
      nextButton,
      products,
      showCatalogFilter,
      showCartButton,
      showNextButton,
      showQuantity,
      t,
      vendorRootPath,
    } = this.props;

    return products.items.length
      ? (
        <ProductList
          catalogFilterProps={catalogFilterProps}
          nextButton={nextButton}
          products={products}
          showCartButton={showCartButton}
          showCatalogFilter={showCatalogFilter}
          showNextButton={showNextButton}
          showPagination
          showQuantity={showQuantity}
          t={t}
          title={t('vendor.search.results_title', { count: products.totalCount })}
        />
      )
      : (
        <ItemListCatalog
          catalogFilterProps={catalogFilterProps}
          showCatalogFilter={showCatalogFilter}
          t={t}
        >
          <div className="b-text b-text_center">
            <p>
              {t('vendor.search.nothing_found')}
            </p>
            <a
              className="b-btn btn"
              href={vendorRootPath}
            >
              {t('vendor.order.continue_shopping')}
            </a>
          </div>
        </ItemListCatalog>
      );
  }
}

ProductSearch.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  nextButton: PropTypes.object,
  products: schemas.productList.isRequired,
  showCatalogFilter: PropTypes.bool.isRequired,
  showCartButton: PropTypes.bool.isRequired,
  showNextButton: PropTypes.bool,
  showQuantity: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  vendorRootPath: PropTypes.string,
};

export default ProductSearch;
