import React, { Component, PropTypes } from 'react';
import ProductBlock from 'rc/Product/ProductBlock';
import CatalogFilterContainer from 'rc/CatalogFilter';

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
      showCatalogFilter,
      showQuantity,
      t,
      title,
    } = this.props;

    return (
      <section className="b-item-list b-item-list_catalog">
        {showCatalogFilter && <CatalogFilterContainer {...catalogFilterProps} />}
        {title && (
          <h2>
            <a href="#" onClick={this.handleCategoryClick}>
              {title}
            </a>
          </h2>
        )}
        <div className="b-item-list__content">
          {items.map((item) => (
            <ProductBlock
              i18n={i18n}
              key={`product-block-${item.id}`}
              product={item}
              showCartButton={showCartButton}
              showQuantity={showQuantity}
            />
          ))}
        </div>
        <div className="b-page__content__inner">
          <a href="#" onClick={this.handleCategoryClick}>
            {t('vendor.products.others')}
          </a>
        </div>

      </section>
    );
  }
}

ProductGroup.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  i18n: PropTypes.object,
  products: PropTypes.object.isRequired,
  showCartButton: PropTypes.bool.isRequired,
  showCatalogFilter: PropTypes.bool,
  showQuantity: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  vendorCategoryPath: PropTypes.string.isRequired,
};

ProductGroup.defaultProps = {
  showCartButton: false,
  showCatalogFilter: false,
  showQuantity: false,
};

export default ProductGroup;
