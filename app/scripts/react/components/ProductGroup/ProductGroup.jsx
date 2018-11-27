import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductBlock from 'rc/Product/ProductBlock';
import CatalogFilterContainer from 'rc/CatalogFilter';
import ItemListCatalog from 'rc/ItemListCatalog';

class ProductGroup extends Component {
  constructor(props) {
    super(props);

    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }
  handleCategoryClick(ev) {
    ev.preventDefault();
    window.location.href = this.props.vendorCategoryPath;
  }
  render() {
    const {
      catalogFilterProps,
      i18n,
      products: {
        items,
      },
      showCartButton,
      showAuthForBuyButton,
      showCatalogFilter,
      showQuantity,
      t,
      title,
      isFilterOpenByDefault,
    } = this.props;

    return (
      <ItemListCatalog
        catalogFilterProps={catalogFilterProps}
        showCatalogFilter={showCatalogFilter}
        isOpenByDefault={isFilterOpenByDefault}
        t={t}
      >
        {title && (
          <h2>
            <a href="#" onClick={this.handleCategoryClick}>
              {title}
            </a>
          </h2>
        )}
        <div className="b-item-list__content">
          {items.map(item => (
            <ProductBlock
              i18n={i18n}
              key={`product-block-${item.id}`}
              product={item}
              showCartButton={showCartButton}
              showAuthForBuyButton={showAuthForBuyButton}
              showQuantity={showQuantity}
            />
          ))}
        </div>
        <div className="b-page__content__inner">
          <a href="#" className="b-page__content__inner_show-all-button" onClick={this.handleCategoryClick}>
            {t('vendor.products.others')}
          </a>
        </div>
      </ItemListCatalog>
    );
  }
}

ProductGroup.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  i18n: PropTypes.object,
  products: PropTypes.object.isRequired,
  showCartButton: PropTypes.bool.isRequired,
  showAuthForBuyButton: PropTypes.bool,
  showCatalogFilter: PropTypes.bool,
  showQuantity: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  vendorCategoryPath: PropTypes.string.isRequired,
  isFilterOpenByDefault: PropTypes.bool,
};

ProductGroup.defaultProps = {
  showCartButton: false,
  showCatalogFilter: false,
  showQuantity: false,
  isFilterOpenByDefault: false
};

export default ProductGroup;
