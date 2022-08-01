// Example of format
// properties: [{
//   id: 123,
//   type: 'PropertyColor',
//   title: 'Цвет',
//   items: [
//     { title: 'Розовый', color: '#333333', value: 123 },
//     { title: 'Синий в горошек', color: '#123212', image_url: '../images/15927_src.jpg', value: 456 }
//   ]
// }]
//
// goods: [{
//   article: 'Артикул 12',
//   good_global_id: 'qweqwewqeq',
//   image_url: 'htttp://...product.png',
//   quantity: 12,
//   attributes: { 345: 12, 123: 456 }
// }]
//
// values: { 123: 456 }
//
// Returns
// {
//   123: [
//     { value: 123, title: 'Розовый', color: '#333333', disabled: false },
//     { value: 456, title: 'Синий в горошек', color: '#123212', image_url: '../images/15927_src.jpg', disabled: true },
//     { value: 789, title: 'Серо-синий', color: '#6c7a89', disabled: false }
//   ]
// }

import includes from 'lodash/includes';

export function getOptions(properties, goods, filters) {
  return properties.reduce((prev, property) => {
    const propertyFilters = getFiltersForProperty(property, properties, filters);

    return {
      ...prev,
      [property.id]: getOptionsForProperty(property, goods, propertyFilters)
    };
  }, {});
}

export function getInitialValues(properties, goods) {
  const initialValues = {};

  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    const enabledValues = getEnabledValues(prop.id, goods, initialValues);

    if (enabledValues.length) {
      initialValues[prop.id] = enabledValues[0];
    }
  }

  return initialValues;
}

export function getUpdatedValues(property, properties, goods, filters, data) {
  const newValues = {
    ...getFiltersForProperty(property, properties, filters),
    ...data,
  }

  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];

    if (!newValues.hasOwnProperty(prop.id)) {
      const enabledValues = getEnabledValues(prop.id, goods, newValues);

      if (enabledValues.length) {
        if (includes(enabledValues, filters[prop.id])) {
          newValues[prop.id] = filters[prop.id];
        } else {
          newValues[prop.id] = enabledValues[0];
        }
      }
    }
  }

  return newValues;
}

export function getInitialGood(properties, goods) {
  const filters = getInitialValues(properties, goods);
  return getMatchedGood(properties, goods, filters);
}

export function getMatchedGood(properties, goods, filters) {
  for (var i = 0; i < goods.length; i++) {
    const good = goods[i];

    if (isGoodStrictlyFiltered(good, filters)) {
      return good;
    }
  }

  return null;
}

function getFiltersForProperty(property, properties, filters) {
  const propertyFilters = {};

  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];

    if (prop === property) break;

    if (typeof filters[prop.id] !== 'undefined') {
      propertyFilters[prop.id] = filters[prop.id];
    }
  }

  return propertyFilters;
}

function getOptionsForProperty(property, goods, filters) {
  const enabledValues = getEnabledValues(property.id, goods, filters);

  return property.items.map((item) => ({
    ...item,
    disabled: (item.disabled || (enabledValues.indexOf(item.value) === -1))
  }));
}

function getEnabledValues(propertyID, goods, filters) {
  return goods.reduce((previous, good) => {
    if (isGoodFiltered(good, filters)) {
      const attrValue = good.attributes[propertyID];

      if (typeof attrValue !== 'undefined' && good.isOrdering) {
        const attrIndex = previous.indexOf(attrValue);
        if (attrIndex === -1) previous.push(attrValue);
      }
    }

    return previous;
  }, []);
}

function isGoodFiltered(good, filters) {
  for (let key in good.attributes) {
    const attrValue = good.attributes[key];
    const filterValue = filters[key];

    if (attrValue !== filterValue && filterValue != null) {
      return false;
    }
  }

  return true;
}

function isGoodStrictlyFiltered(good, filters) {
  for (let key in good.attributes) {
    const attrValue = good.attributes[key];
    const filterValue = filters[key];

    if (attrValue !== filterValue) {
      return false;
    }
  }

  return true;
}
