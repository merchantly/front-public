import React, { Component, PropTypes } from 'react';
import ChildrenProducts from 'rc/ChildrenProducts';
import CategoriesShowChildren from './CategoriesShowChildren';
import provideTranslations from 'rc/HoC/provideTranslations';

class CategoriesShowChildrenContainer extends Component {
  render() {    
    return <CategoriesShowChildren {...this.props} />;
  }
}

CategoriesShowChildrenContainer.propTypes = {
  childrenProducts: ChildrenProducts.propTypes.childrenProducts,
  container: PropTypes.object,
  showCartButton: PropTypes.bool,
  showQuantity: PropTypes.bool,
  t: PropTypes.func,
  title: PropTypes.string,
  vendorRootPath: PropTypes.string,  
};

CategoriesShowChildrenContainer.defaultProps = {
  container: {},
  childrenProducts: [],
  showCartButton: false,
  showQuantity: false,
  vendorRootPath: '',
};

export default provideTranslations(CategoriesShowChildrenContainer);
