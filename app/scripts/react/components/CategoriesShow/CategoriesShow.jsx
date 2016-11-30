import React, { Component, PropTypes } from 'react';
import ProductList from 'rc/ProductList/ProductList';

class CategoriesShow extends Component {
  render() {
    const {
      container,
      isFilterDirty,
      nextButton,
      products,
      showNextButton,
      t,
      title,
      vendorRootPath,
    } = this.props;

    return products.items.length > 0 || isFilterDirty
      ? (
        <ProductList
          container={container}
          nextButton={nextButton}
          products={products}
          showNextButton={showNextButton}
          showPagination
          t={t}
          title={title}
        />
      )
      : (
        <div className="b-text b-text_center">
          <p>
            {t('vendor.category.empty')}
          </p>
          <a className="b-btn" href={vendorRootPath}>
            {t('vendor.category.continue_shopping')}
          </a>
        </div>
      );
  }
}

CategoriesShow.propTypes = {
  container: PropTypes.object.isRequired,
  isFilterDirty: PropTypes.bool,
  nextButton: PropTypes.object,
  products: PropTypes.object.isRequired,
  showNextButton: PropTypes.bool,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  vendorRootPath: PropTypes.string,
};

export default CategoriesShow;
