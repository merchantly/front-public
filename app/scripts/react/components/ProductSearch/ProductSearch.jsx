import React, { Component, PropTypes } from 'react';
import ProductList from 'rc/ProductList/ProductList';
import CatalogFilterContainer from 'rc/CatalogFilter';
import * as schemas from 'r/schemas';

class ProductSearch extends Component {
  render() {
    const {
      catalogFilterProps,
      products,
      showCatalogFilter,
      showCartButton,
      showQuantity,
      t,
      vendorRootPath,
    } = this.props;

    return products.items.length
      ? (
        <ProductList
          catalogFilterProps={catalogFilterProps}
          products={products}
          showCartButton={showCartButton}
          showCatalogFilter={showCatalogFilter}
          showPagination
          showQuantity={showQuantity}
          t={t}
          title={t('vendor.search.results_title', { count: products.totalCount })}
        />
      )
      : (
        <section className="b-item-list b-item-list_catalog">
          {showCatalogFilter && <CatalogFilterContainer {...catalogFilterProps} />}
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
        </section>
      );
  }
}

ProductSearch.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  products: schemas.productList.isRequired,
  showCatalogFilter: PropTypes.bool.isRequired,
  showCartButton: PropTypes.bool.isRequired,
  showQuantity: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  vendorRootPath: PropTypes.string,
};

export default ProductSearch;
