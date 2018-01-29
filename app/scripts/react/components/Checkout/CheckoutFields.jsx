import React, { Component, PropTypes } from 'react';
import CheckoutField from './CheckoutField';
import { camelize } from 'humps';
import { getIn } from 'timm';
import { pick, mapValues } from 'lodash';

class CheckoutFields extends Component {
  render() {
    const {
      deliveryType,
      items,
      itemValues,
      onChange,
    } = this.props;

    return (
      <span>
        {items.map((item) => {
          const value = getIn(itemValues, [item.name, 'value']);

          const belongs = getIn(deliveryType, ['selects', camelize(item.name), 'belongs'])

          const belongsData = mapValues(
            pick(itemValues, belongs),
            (v) => getIn(v, ['value'])
          );

          return (
            <div className="b-form__row__widget" key={item.name}>
              <CheckoutField
                deliveryType={deliveryType}
                belongsData={belongsData}
                item={item}
                value={value}
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
  deliveryType: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  itemValues: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

CheckoutFields.defaultProps = {
};

export default CheckoutFields;
