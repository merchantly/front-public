/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import provideTranslations from '../HoC/provideTranslations';
import CatalogFilterOptions from './CatalogFilterOptions';
import CatalogFilterToggle from './CatalogFilterToggle';
import { showFilteredCount } from '../../actions/catalogFilterActions';
import { getFilter } from './utils';
import YouAreI from 'youarei';

class CatalogFilter extends Component {
  state = {
    showApplyButton: false,
    showClearButton: (this.props.showFilterClearButton && this.filterParamsPresent()),
    filter: ''
  }

  clearFilter() {
    window.location.replace(window.location.pathname);
  }

  filterParamsPresent() {
    const url = new YouAreI(this.props.filterUrl);
    const query = url.query_get();
    delete query['page'];

    Object.keys(query).length > 0
  }

  handleOptionChange(option) {
    if (this.props.filterApplyType == 'notice') {
      showFilteredCount(getFilter(option, option.props.params), this.props.t);
    }

    this.setState({ showApplyButton: true, showClearButton: true})
  }

  render() {
    const {
      handleFilterToggle,
      isFilterToggleVisible,
      isOpen,
      filterUrl,
      t,
      filterApplyType,
      showFilterClearButton,
    } = this.props;

    const {
      showApplyButton,
      showClearButton,
    } = this.state;

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
              <CatalogFilterOptions {...this.props} handleOptionChange={this.handleOptionChange.bind(this)}/>
            </div>
          
            { showApplyButton && (filterApplyType == 'btn') && (
              <div className="b-apply-filter">
                <button class='b-btn b-btn-apply-filter'>
                  {t('vendor.filter.apply_filter')}
                </button>
              </div>
            )}
          </form>
          { showClearButton && showFilterClearButton && (
            <div className="b-clear-filter">
              <button class='b-btn b-btn_trans b-btn-clear-filter' onClick={this.clearFilter.bind(this)}>
                {t('vendor.filter.clear_filter')}
              </button>
            </div>
          )}

        </div>
      </div>
    );
  }
}

CatalogFilter.propTypes = {
  filterName: PropTypes.string,
  filterUrl: PropTypes.string.isRequired,
  handleFilterToggle: PropTypes.func.isRequired,
  isFilterToggleVisible: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  params: PropTypes.object,
  selectedOptions: PropTypes.array,
  t: PropTypes.func.isRequired,
  filterApplyType: PropTypes.string,
  showFilterClearButton: PropTypes.bool.isRequired,
};

export default provideTranslations(CatalogFilter);
