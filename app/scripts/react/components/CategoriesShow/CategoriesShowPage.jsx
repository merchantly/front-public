import React, { Component, PropTypes } from 'react';
import ProductList from 'rc/ProductList';
import CategoriesShowContainer from './index';
import VendorLayoutContainer from 'rc/VendorLayout';

class CategoriesShowPage extends Component {
  render() {
    const {
      container,
      i18n,
      isFilterDirty,
      layoutProps,
      products,
      title,
      vendorRootPath,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <CategoriesShowContainer
          container={container}
          i18n={i18n}
          isFilterDirty={isFilterDirty}
          products={products}
          title={title}
          vendorRootPath={vendorRootPath}
        />
      </VendorLayoutContainer>
    );
  }
}

CategoriesShowPage.propTypes = {
  container: ProductList.wrapped.propTypes.container,
  i18n: PropTypes.object,
  isFilterDirty: PropTypes.bool,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  products: ProductList.wrapped.propTypes.products,
  title: PropTypes.string,
  vendorRootPath: PropTypes.string,
};

CategoriesShowPage.defaultProps = {

};

export default CategoriesShowPage;
