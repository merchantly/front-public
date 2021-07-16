import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductGroup from 'rc/ProductGroup';
import CatalogFilterContainer from 'rc/CatalogFilter';
import * as schemas from 'r/schemas';
import ProductListContainer from 'rc/ProductList/ProductListContainer';
import ProductListContainerBottom from 'rc/ProductList/ProductListContainerBottom';
import ProductCardSimilarProducts from "../Product/ProductCard/ProductCardSimilarProducts";

class ChildrenProducts extends Component {
  render() {
    const {
      catalogFilterProps,
      childrenProducts,
      i18n,
      showCartButton,
      showAuthForBuyButton,
      vendorClientSigninPath,
      showCatalogFilter,
      showQuantity,
      title,
      container,
      historyProducts,
      t
    } = this.props;

    return (
      <div>
        {title && (
          <div>
            <h1 className="b-item-list__title">
              {title}
            </h1>
            <ProductListContainer container={container} />
          </div>
        )}
        {childrenProducts.map(({ products, title, vendorCategoryPath }, idx) => (
          <ProductGroup
            catalogFilterProps={catalogFilterProps}
            i18n={i18n}
            key={`product-group-${idx}`}
            products={{ items: products }}
            showCartButton={showCartButton}
            showAuthForBuyButton={showAuthForBuyButton}
            vendorClientSigninPath={vendorClientSigninPath}
            showCatalogFilter={showCatalogFilter && idx === 0}
            showQuantity={showQuantity}
            title={title}
            vendorCategoryPath={vendorCategoryPath}
          />
        ))}
        <ProductCardSimilarProducts products={historyProducts} t={t} showCartButton={true} title={t('vendor.history_product.title')} />
        <ProductListContainerBottom container={container} />
      </div>
    );
  }
}

ChildrenProducts.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  childrenProducts: schemas.childrenProducts.isRequired,
  i18n: PropTypes.object,
  showCartButton: PropTypes.bool,
  showAuthForBuyButton: PropTypes.bool,
  vendorClientSigninPath: PropTypes.string,
  showCatalogFilter: PropTypes.bool,
  showQuantity: PropTypes.bool,
  title: PropTypes.string,
  container: schemas.container.isRequired,
  historyProducts: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func.isRequired,
};

ChildrenProducts.defaultProps = {
  container: {},
  childrenProducts: [],
  showCartButton: false,
  showAuthForBuyButton: false,
  vendorClientSigninPath: '/signin',
  showCatalogFilter: false,
  showQuantity: false,
};

export default ChildrenProducts;
