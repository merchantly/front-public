import React, { Component } from 'react'; import PropTypes from 'prop-types';

import { getOptions } from './utils';

import PropertyListItem from './PropertyListItem';

const PropertyList = ({ goods, onChange, properties, t, values }) => {
  if (properties.length) {
    const options = getOptions(properties, goods, values);
    const propertyList = properties.map((property) => (
      <PropertyListItem
        key={property.id}
        onChange={onChange.bind(this, property)}
        options={options[property.id] || []}
        property={property}
        t={t}
        value={values[property.id] || null}
      />
    ));

    return <span>{propertyList}</span>;
  }

  return (
    <div className="p-lg text-center">
      <p>{t('vendor.properties.empty')}</p>
    </div>
  );
};

export default PropertyList;