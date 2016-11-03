import React, { Component, PropTypes } from 'react';
import ImageSlider from 'rc/common/ImageSlider';
import PostProducts from 'rc/common/PostProducts';
import ProductList from 'rc/ProductList/ProductList';
import { h1 } from 'r/helpers/seo';
import CatalogFilterContainer from 'rc/CatalogFilter';
import * as schemas from 'r/schemas';

class Welcome extends Component {
  render() {
    const {
      catalogFilterProps,
      isFilterDirty,
      products,
      showCartButton,
      showCatalogFilter,
      showPaginationOnWelcome,
      showQuantity,
      showWelcomeSlider,
      vendor,
      t,
    } = this.props;
    const {
      preProductsText,
      postProductsText,
      sliderImages,
    } = vendor;


    return (
      <div>
        <div className="b-page__content__inner b-page__content__inner_slider">
          {showWelcomeSlider && (
            <ImageSlider
              className="b-slider_promo"
              hasThumbs={false}
              slides={sliderImages}
            />
          )}
        </div>
        {preProductsText && (
          <div className="b-page__content__inner b-page__content__inner_content">
            <div className="lead-text">
              <div
                className="lead-text__content"
                dangerouslySetInnerHTML={{ __html: preProductsText }}
              />
            </div>
          </div>
        )}
        {(products.items.length || isFilterDirty) && (
          <div className="b-page__content__inner b-page__content__inner_content">
            <ProductList
              catalogFilterProps={catalogFilterProps}
              products={products}
              showCartButton={showCartButton}
              showCatalogFilter={showCatalogFilter}
              showPagination={showPaginationOnWelcome}
              showQuantity={showQuantity}
              t={t}
            />
          </div>
        )}
        {postProductsText && (
          <div className="b-page__content__inner b-page__content__inner_content">
            <PostProducts
              postProductsText={postProductsText}
              title={h1(vendor)}
            />
          </div>
        )}
      </div>
    );
  }
}

Welcome.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  isFilterDirty: PropTypes.bool.isRequired,
  products: schemas.productList.isRequired,
  showCartButton: PropTypes.bool.isRequired,
  showCatalogFilter: PropTypes.bool.isRequired,
  showPaginationOnWelcome: PropTypes.bool.isRequired,
  showQuantity: PropTypes.bool.isRequired,
  showWelcomeSlider: PropTypes.bool.isRequired,
  vendor: schemas.vendor.isRequired,
  t: PropTypes.func.isRequired,
};

Welcome.defaultProps = {

};

export default Welcome;
