import React, { Component, PropTypes } from 'react';
import ProductSearchForm from 'rc/common/ProductSearchForm';
import { schemaOrgMarkup } from 'r/helpers/product';
import { h1 } from 'r/helpers/seo';

class ProductArchived extends Component {
  render() {
    const {
      product,
      searchProductsPath,
      t,
      vendorCategoryPath,
    } = this.props;
    const {
      category,
      title,
    } = product;

    return (
      <div>
        {schemaOrgMarkup(product)}
        <meta content={h1(product)} itemProp="description" />
        <div className="b-text b-text_center">
          <noindex>
            <div
              className="u-title"
              dangerouslySetInnerHTML={{ __html: t('vendor.product.sold_out_message_html', { title }) }}
              title={title}
            />
          </noindex>
          {category && (
            <div>
              <p>
                <a
                  className="p-category"
                  href={vendorCategoryPath}
                  title={category.title}
                >
                  {category.title}
                </a>
              </p>
              <a
                className="b-btn"
                href={vendorCategoryPath}
                title={t('vendor.product.show_other_products')}
              >
                {t('vendor.product.show_other_products')}
              </a>
            </div>
          )}
        </div>
        <div className="b-search-box">
          <div className="b-search-box__content">
            <ProductSearchForm searchProductsPath={searchProductsPath} t={t} />
          </div>
        </div>
      </div>
    );
  }
}

ProductArchived.propTypes = {
  product: PropTypes.object.isRequired,
  searchProductsPath: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  vendorCategoryPath: PropTypes.string,
};

export default ProductArchived;
