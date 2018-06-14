import React, { Component } from 'react'; import PropTypes from 'prop-types';

import * as propertyTypes from '../../../constants/propertyTypes';

import PropertyListItemColor from './PropertyListItemColor';
import PropertyListItemDictionary from './PropertyListItemDictionary';

class PropertyListItem extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    property: PropTypes.object.isRequired,
    value: PropTypes.any,
  }
  render() {
    const { value, options, property, onChange, t } = this.props;
    const Component = this.getComponentByType(property.type);

    if (typeof Component === 'function') {
      return (
        <Component
          key={property.id}
          name={this.getItemName(property.id)}
          onChange={this.props.onChange}
          options={options}
          propertyTitle={property.title}
          value={value}
        />
      );
    } else {
      return <span>{t('vendor.property.unknown_type')}</span>;
    }
  }
  getComponentByType(propertyType) {
    const typeComponents = {
      [propertyTypes.PROPERTY_COLOR_TYPE]: PropertyListItemColor,
      [propertyTypes.PROPERTY_DICTIONARY_TYPE]: PropertyListItemDictionary
    };

    return typeComponents[propertyType];
  }
  getItemName(propertyID) {
    return `attribute[${propertyID}]`;
  }
}

export default PropertyListItem;