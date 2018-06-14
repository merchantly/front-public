import React, { Component } from 'react'; import PropTypes from 'prop-types';
import CatalogFilterSelectedOptions from './CatalogFilterSelectedOptions';
import CatalogFilterCheckbox from './CatalogFilterCheckbox';
import CatalogFilterRadio from './CatalogFilterRadio';
import CatalogFilterRange from './CatalogFilterRange';
import CatalogFilterColor from './CatalogFilterColor';

class CatalogFilterOptions extends Component {
  renderOptions() {
    const { filterName, options, params, t } = this.props;

    return options.map((item, i) => {
      const props = {...item, filterName, params, key: i, t};

      switch(item.type) {
        case 'checkbox':
          return <CatalogFilterCheckbox {...props} />;
        case 'radio':
          return <CatalogFilterRadio {...props} />;
        case 'range':
          return <CatalogFilterRange {...props} />;
        case 'color':
          return <CatalogFilterColor {...props} />;
        default:
          console.warn('Unknown item type of CatalogFilterList component', item);
          return null;
      }
    });
  }
  render() {
    const { selectedOptions } = this.props;

    return (
      <ul className="b-full-filter__list-wrap">
        {!!selectedOptions.length &&
          <CatalogFilterSelectedOptions {...this.props} />
        }
        {this.renderOptions()}
      </ul>
    );
  }
}

CatalogFilterOptions.propTypes = {
  filterName: PropTypes.string,
  options: PropTypes.array.isRequired,
  params: PropTypes.object,
  selectedOptions: PropTypes.array,
};

export default CatalogFilterOptions;