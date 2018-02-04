import React, { Component, PropTypes } from 'react';
import CheckoutField from './CheckoutField';
import { decamelizeKeys } from 'humps';
import { pick, mapValues, includes } from 'lodash';

const buildRequestData = ({belongs = [], requestData = {}}, values) => {
  const belongsData = mapValues(
    pick(values, belongs || []),
    (v) => getIn(v, ['value'])
  );
  return decamelizeKeys({ ...belongsData, ...requestData });
}

class CheckoutFields extends Component {
  render() {
    const {
      fields,
      values,
      onChange,
    } = this.props;

    return (
      <span>
        {fields.map((field) => {
          const value = values[field.name];
          const requestData = buildRequestData(field.ajaxSettings || {}, values)

          return (
            <div className="b-form__row__widget" key={field.name}>
              <CheckoutField
                requestData={requestData}
                field={field}
                value={field.reservedValue || value}
                onChange={onChange}
              />
            </div>
          );
        })}
      </span>
    );
  }
}

CheckoutFields.propTypes = {
  fields: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

CheckoutFields.defaultProps = {
};

export default CheckoutFields;
