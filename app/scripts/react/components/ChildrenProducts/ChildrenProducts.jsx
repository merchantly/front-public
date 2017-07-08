import React, { Component, PropTypes } from 'react';
import ProductGroup from 'rc/ProductGroup';
import CatalogFilterContainer from 'rc/CatalogFilter';
import * as schemas from 'r/schemas';
import ProductListContainer from 'rc/ProductList/ProductListContainer';
import ProductListContainerBottom from 'rc/ProductList/ProductListContainerBottom';

class ChildrenProducts extends Component {
  render() {
    const {
      catalogFilterProps,
      childrenProducts,
      i18n,
      showCartButton,
      showCatalogFilter,
      showQuantity,
      title,
      container,
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
            showCatalogFilter={showCatalogFilter && idx === 0}
            showQuantity={showQuantity}
            title={title}
            vendorCategoryPath={vendorCategoryPath}
          />
        ))}
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
  showCatalogFilter: PropTypes.bool,
  showQuantity: PropTypes.bool,
  title: PropTypes.string,
  container: schemas.container.isRequired,
};

ChildrenProducts.defaultProps = {
  container: {},
  childrenProducts: [],
  showCartButton: false,
  showCatalogFilter: false,
  showQuantity: false,
};

export default ChildrenProducts;
