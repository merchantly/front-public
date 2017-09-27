/* eslint-disable react/no-unused-prop-types */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import provideTranslations from '../HoC/provideTranslations';
import CatalogFilterOptions from './CatalogFilterOptions';
import CatalogFilterToggle from './CatalogFilterToggle';

class CatalogFilter extends Component {
  render() {
    const {
      handleFilterToggle,
      isFilterToggleVisible,
      isOpen,
      filterUrl,
      t,
    } = this.props;
    const containerClasses = classNames('b-item-list__filter-container', {
      'b-item-list__filter-container--trigger-visible': isFilterToggleVisible,
    });

    return (
      <div className={containerClasses}>
        <CatalogFilterToggle
          handleFilterToggle={handleFilterToggle}
          isOpen={isOpen}
          t={t}
          isVisible={isFilterToggleVisible}
        />
        <div className="b-item-list__filter">
          <form action={filterUrl} method="get">
            <div className="b-full-filter">
              <CatalogFilterOptions {...this.props} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CatalogFilter.propTypes = {
  hideInMobileByDefault: PropTypes.bool,
  filterName: PropTypes.string,
  filterUrl: PropTypes.string.isRequired,
  handleFilterToggle: PropTypes.func.isRequired,
  isFilterToggleVisible: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  params: PropTypes.object,
  selectedOptions: PropTypes.array,
  t: PropTypes.func.isRequired,
};

export default provideTranslations(CatalogFilter);
