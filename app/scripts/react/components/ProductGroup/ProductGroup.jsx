import React, { Component, PropTypes } from 'react';
import ProductBlock from 'rc/Product/ProductBlock';
import CatalogFilterContainer from 'rc/CatalogFilter';

class ProductGroup extends Component {
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
      title,
    } = this.props;

    return (
      <section className="b-item-list b-item-list_catalog">
        {showCatalogFilter && <CatalogFilterContainer {...catalogFilterProps} />}
        {title && (
          <h2>
            <span>
              {title}
            </span>
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
  title: PropTypes.string,
};

ProductGroup.defaultProps = {
  showCartButton: false,
  showCatalogFilter: false,
  showQuantity: false,
};

export default ProductGroup;
