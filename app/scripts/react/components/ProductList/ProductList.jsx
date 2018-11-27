import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductBlock from 'rc/Product/ProductBlock';
import Pagination from 'rc/Pagination';
import CatalogFilterContainer from 'rc/CatalogFilter';
import ItemListCatalog from 'rc/ItemListCatalog';
import { Image } from 'rc/common/Image';
import * as schemas from 'r/schemas';
import ProductListContainer from './ProductListContainer';
import ProductListContainerBottom from './ProductListContainerBottom';

class ProductList extends Component {
  render() {
    const {
      catalogFilterProps,
      showCatalogFilter,
      container,
      i18n,
      nextButton,
      products: {
        items,
        pagination,
      },
      showCartButton,
      showAuthForBuyButton,
      vendorClientSigninPath,
      showNextButton,
      showPagination,
      showQuantity,
      t,
      title,
      isFilterOpenByDefault
    } = this.props;

    return (
      <ItemListCatalog
        catalogFilterProps={catalogFilterProps}
        showCatalogFilter={showCatalogFilter}
        isOpenByDefault={isFilterOpenByDefault}
        t={t}
      >
        {title && (
          <h1 className="b-item-list__title">
            {title}
          </h1>
        )}
        <ProductListContainer container={container} />
        <div className="b-item-list__content">
          {items.length > 0
            ? items.map(item => (
              <ProductBlock
                i18n={i18n}
                key={`product-block-${item.id}`}
                product={item}
                showCartButton={showCartButton}
                showAuthForBuyButton={showAuthForBuyButton}
                vendorClientSigninPath={vendorClientSigninPath}
                showQuantity={showQuantity}
              />
            ))
            : (
              <div className="b-text b-text_center">
                {t('vendor.products.nothing_found_by_criteria')}
              </div>
            )
          }
          {(showPagination && pagination.totalPages > 1) && (
            <div className="b-item-list__paginator">
              <Pagination {...pagination} />
            </div>
          )}
          {!!showNextButton && (
            <div className="b-text b-item-list__next">
              <a className="b-btn b-btn_trans" href={nextButton.url}>
                {nextButton.title}
              </a>
            </div>
          )}
        </div>
        <ProductListContainerBottom container={container} />
      </ItemListCatalog>
    );
  }
}

ProductList.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  container: schemas.container.isRequired,
  i18n: PropTypes.object,
  products: PropTypes.shape({
    items: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
  }).isRequired,
  showCartButton: PropTypes.bool,
  showAuthForBuyButton: PropTypes.bool,
  vendorClientSigninPath: PropTypes.string,
  showCatalogFilter: PropTypes.bool,
  showPagination: PropTypes.bool,
  showQuantity: PropTypes.bool,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  isFilterOpenByDefault: PropTypes.bool,
};

ProductList.defaultProps = {
  isFilterOpenByDefault: false
}

export default ProductList;
