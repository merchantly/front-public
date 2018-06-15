import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getOptions } from './utils';
import Select from '../../common/Select';

export default class PropertySingle extends Component {
  static propTypes = {
    goods: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    properties: PropTypes.array.isRequired,
    values: PropTypes.object.isRequired,
  }
  getItemName(propertyID) {
    return `attribute[${propertyID}]`;
  }
  render() {
    const { goods, onChange, properties, values } = this.props;
    const options = getOptions(properties, goods, values);
    const property = properties[0];

    if (property) {
      return (
        <Select
          name={this.getItemName(property.id)}
          onChange={onChange.bind(this, property)}
          options={options[property.id] || []}
          value={values[property.id] || null}
        />
      );
    }

    return null;
  }
}