import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      nextButton,
      products,
      showCartButton,
      showAuthForBuyButton,
      vendorClientSigninPath,
      showCatalogFilter,
      showNextButton,
      showPaginationOnWelcome,
      showQuantity,
      showWelcomeSlider,
      vendor,
      t,
      rtl,
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
              rtl={rtl}
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
              nextButton={nextButton}
              products={products}
              showCartButton={showCartButton}
              showAuthForBuyButton={showAuthForBuyButton}
              vendorClientSigninPath={vendorClientSigninPath}
              showCatalogFilter={showCatalogFilter}
              showNextButton={showNextButton}
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
              title={vendor.h1}
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
  nextButton: PropTypes.object,
  products: schemas.productList.isRequired,
  showCartButton: PropTypes.bool.isRequired,
  showAuthForBuyButton: PropTypes.bool,
  vendorClientSigninPath: PropTypes.string,
  showCatalogFilter: PropTypes.bool.isRequired,
  showNextButton: PropTypes.bool,
  showPaginationOnWelcome: PropTypes.bool.isRequired,
  showQuantity: PropTypes.bool.isRequired,
  showWelcomeSlider: PropTypes.bool.isRequired,
  vendor: schemas.vendor.isRequired,
  t: PropTypes.func.isRequired,
  rtl: PropTypes.bool.isRequired,
};

Welcome.defaultProps = {
  rtl: false
};

export default Welcome;
