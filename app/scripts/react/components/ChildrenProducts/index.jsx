import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChildrenProducts from './ChildrenProducts';
import CatalogFilterContainer from 'rc/CatalogFilter';
import * as schemas from 'r/schemas';

class ChildrenProductsContainer extends Component {
  render() {
    return <ChildrenProducts {...this.props} />;
  }
}

ChildrenProductsContainer.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  childrenProducts: schemas.childrenProducts.isRequired,
  i18n: PropTypes.object,
  showCartButton: PropTypes.bool,
  showAuthForBuyButton: PropTypes.bool,
  showCatalogFilter: PropTypes.bool,
  showQuantity: PropTypes.bool,
  title: PropTypes.string,
};

ChildrenProductsContainer.defaultProps = {
  childrenProducts: [],
  showCartButton: false,
  showAuthForBuyButton: false,
  showCatalogFilter: false,
  showQuantity: false,
};

export default ChildrenProductsContainer;
