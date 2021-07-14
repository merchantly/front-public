import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChildrenProducts from 'rc/ChildrenProducts';
import CategoriesShowChildrenContainer from './index';
import VendorLayoutContainer from 'rc/VendorLayout';
import CategoriesShowPage from "../CategoriesShow/CategoriesShowPage";

class CategoriesShowChildrenPage extends Component {
  componentDidMount() {
    let products = [];

    this.props.childrenProducts.forEach(function(child) {
      products = products.concat(child.products);
    })

    try {
      $(window).trigger('m.category', [products.slice(0, 20)]);
    } catch (e) {
      console.log('trigger: ', e.message);
    }
  }

  render() {
    const {
      childrenProducts,
      i18n,
      layoutProps,
      showCartButton,
      showAuthForBuyButton,
      vendorClientSigninPath,
      showQuantity,
      title,
      vendorRootPath,
      container,
      historyProducts,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <CategoriesShowChildrenContainer
          childrenProducts={childrenProducts}
          i18n={i18n}
          showCartButton={showCartButton}
          showAuthForBuyButton={showAuthForBuyButton}
          vendorClientSigninPath={vendorClientSigninPath}
          showQuantity={showQuantity}
          title={title}
          vendorRootPath={vendorRootPath}
          container={container}
          historyProducts={historyProducts}
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
  showAuthForBuyButton: PropTypes.bool,
  vendorClientSigninPath: PropTypes.string,
  showQuantity: PropTypes.bool,
  title: PropTypes.string,
  vendorRootPath: PropTypes.string,
  container: PropTypes.object,
  historyProducts: PropTypes.arrayOf(PropTypes.object),
};

CategoriesShowPage.defaultProps = {
  historyProducts: []
};

export default CategoriesShowChildrenPage;
