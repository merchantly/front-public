import React, { Component, PropTypes } from 'react';
import ChildrenProducts from 'rc/ChildrenProducts';
import CategoriesShowChildrenContainer from './index';
import VendorLayoutContainer from 'rc/VendorLayout';

class CategoriesShowChildrenPage extends Component {
  render() {
    const {
      childrenProducts,
      i18n,
      layoutProps,
      showCartButton,
      showQuantity,
      title,
      vendorRootPath,
      container,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <CategoriesShowChildrenContainer
          childrenProducts={childrenProducts}
          i18n={i18n}
          showCartButton={showCartButton}
          showQuantity={showQuantity}
          title={title}
          vendorRootPath={vendorRootPath}
          container={container}
        />
      </VendorLayoutContainer>
    );
  }
}

CategoriesShowChildrenPage.propTypes = {
  childrenProducts: ChildrenProducts.propTypes.childrenProducts,
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  showCartButton: PropTypes.bool,
  showQuantity: PropTypes.bool,
  title: PropTypes.string,
  vendorRootPath: PropTypes.string,
  container: PropTypes.object,
};

export default CategoriesShowChildrenPage;
