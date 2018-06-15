import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductGoods from '../ProductGoods';
import ProductProperties from '../ProductProperties';

export default class ProductCartForProductItems extends Component {
  static propTypes = {
    addWishlistUrl: PropTypes.string,
    isWishlisted: PropTypes.bool,
    onGoodChange: PropTypes.func,
    product: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    wishlistUrl: PropTypes.string,
  }
  render() {
    const { product: { goods, properties }, t } = this.props;
    if (properties.length) {
      return (
        <ProductProperties
          {...this.props}
          goods={goods}
          properties={properties}
          t={t}
        />
      );
    } else {
      return (
        <ProductGoods {...this.props} t={t} />
      );
    }
  }
}
