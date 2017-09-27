/* eslint-disable react/no-unused-prop-types */
import React, { Component, PropTypes } from 'react';
import * as schemas from 'r/schemas';
import CatalogFilter from './CatalogFilter';

class CatalogFilterContainer extends Component {
  render() {
    return <CatalogFilter {...this.props} />;
  }
}

CatalogFilterContainer.propTypes = {
  hideInMobileByDefault: PropTypes.bool,
  filterName: PropTypes.string,
  filterUrl: PropTypes.string.isRequired,
  isFilterToggleVisible: PropTypes.bool,
  options: PropTypes.arrayOf(schemas.catalogFilterOption).isRequired,
  params: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])),
  selectedOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  t: PropTypes.func.isRequired,
};

CatalogFilterContainer.defaultProps = {
  hideInMobileByDefault: true,
  filterUrl: '',
  isFilterToggleVisible: true,
  options: [],
  params: {},
  selectedOptions: [],
};

export default CatalogFilterContainer;
export { CatalogFilter };
