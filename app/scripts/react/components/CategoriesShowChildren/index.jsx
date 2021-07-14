import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChildrenProducts from 'rc/ChildrenProducts';
import CategoriesShowChildren from './CategoriesShowChildren';
import provideTranslations from 'rc/HoC/provideTranslations';
import * as schemas from 'r/schemas';

class CategoriesShowChildrenContainer extends Component {
  render() {
    return <CategoriesShowChildren {...this.props} />;
  }
}

CategoriesShowChildrenContainer.propTypes = {
  childrenProducts: ChildrenProducts.propTypes.childrenProducts,
  container: schemas.container.isRequired,
  showCartButton: PropTypes.bool,
  showAuthForBuyButton: PropTypes.bool,
  vendorClientSigninPath: PropTypes.string,
  showQuantity: PropTypes.bool,
  t: PropTypes.func,
  title: PropTypes.string,
  vendorRootPath: PropTypes.string,
  historyProducts: PropTypes.arrayOf(PropTypes.object),
};

CategoriesShowChildrenContainer.defaultProps = {
  container: {},
  childrenProducts: [],
  showCartButton: false,
  showAuthForBuyButton: false,
  vendorClientSigninPath: '/signin',
  showQuantity: false,
  vendorRootPath: '',
};

export default provideTranslations(CategoriesShowChildrenContainer);
