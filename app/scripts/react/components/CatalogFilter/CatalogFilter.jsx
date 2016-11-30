import React, { Component, PropTypes } from 'react';
import provideTranslations from '../HoC/provideTranslations';
import CatalogFilterOptions from './CatalogFilterOptions';
import CatalogFilterToggle from './CatalogFilterToggle';
import classNames from 'classnames';

class CatalogFilter extends Component {
  constructor(props) {
    super(props);

    this.handleFilterToggle = this.handleFilterToggle.bind(this);
    this.state = {
      isOpen: true,
    };
  }
  componentDidMount() {
    this.syncBodyClass(this.state.isOpen);
  }
  componentWillUpdate(nextProps, nextState) {
    this.syncBodyClass(nextState.isOpen);
  }
  syncBodyClass(isOpen) {
    if (isOpen) {
      document.body.classList.remove('b-page_layout-filter--hidden');
      document.body.classList.add('b-page_layout-filter');
    } else {
      document.body.classList.remove('b-page_layout-filter');
      document.body.classList.add('b-page_layout-filter--hidden');
    }
  }
  handleFilterToggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    const {
      isFilterToggleVisible,
      filterUrl,
    } = this.props;
    const {
      isOpen,
    } = this.state;
    const containerClasses = classNames('b-item-list__filter-container', {
      'b-item-list__filter-container--trigger-visible': isFilterToggleVisible,
    });

    return (
      <div className={containerClasses}>
        <CatalogFilterToggle
          handleFilterToggle={this.handleFilterToggle}
          isOpen={isOpen}
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
  filterName: PropTypes.string,
  filterUrl: PropTypes.string.isRequired,
  isFilterToggleVisible: PropTypes.bool,
  options: PropTypes.array.isRequired,
  params: PropTypes.object,
  selectedOptions: PropTypes.array,
};

export default provideTranslations(CatalogFilter);
