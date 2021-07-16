import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageSlider from 'rc/common/ImageSlider';
import ChildrenProducts from 'rc/ChildrenProducts/ChildrenProducts';
import PostProducts from 'rc/common/PostProducts';
import * as schemas from 'r/schemas';

class WelcomeChildren extends Component {
  render() {
    const {
      childrenProducts,
      showWelcomeSlider,
      vendor: {
        preProductsText,
        postProductsText,
        sliderImages,
      },
      showCartButton,
      showAuthForBuyButton,
      vendorClientSigninPath,
      showCatalogFilter,
      showQuantity,
      rtl,
      historyProducts,
      t
    } = this.props;

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
        {childrenProducts && (
          <div className="b-page__content__inner b-page__content__inner_content">
            <ChildrenProducts
              childrenProducts={childrenProducts}
              showCartButton={showCartButton}
              showAuthForBuyButton={showAuthForBuyButton}
              vendorClientSigninPath={vendorClientSigninPath}
              showCatalogFilter={showCatalogFilter}
              showQuantity={showQuantity}
              historyProducts={historyProducts}
              t={t}
            />
          </div>
        )}
        {postProductsText && (
          <div className="b-page__content__inner b-page__content__inner_content">
            <PostProducts postProductsText={postProductsText}/>
          </div>
        )}
      </div>
    );
  }
}

WelcomeChildren.propTypes = {
  childrenProducts: schemas.childrenProducts,
  showCartButton: PropTypes.bool,
  showAuthForBuyButton: PropTypes.bool,
  vendorClientSigninPath: PropTypes.string,
  showCatalogFilter: PropTypes.bool,
  showQuantity: PropTypes.bool,
  showWelcomeSlider: PropTypes.bool.isRequired,
  vendor: schemas.vendor,
  rtl: PropTypes.bool.isRequired,
  historyProducts: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func.isRequired,
};

WelcomeChildren.defaultProps = {
  rtl: false,
}

export default WelcomeChildren;
