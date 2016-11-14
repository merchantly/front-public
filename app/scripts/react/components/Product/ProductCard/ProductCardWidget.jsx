import React, { Component, PropTypes } from 'react';
import ProductCardContainer from './ProductCardContainer';

class ProductCardWidget extends Component {
  render() {
    const {
      productId,
    } = this.props.routeParams;

    return (
      <ProductCardContainer productId={parseInt(productId, 10)} />
    );
  }
}

ProductCardWidget.propTypes = {
  routeParams: PropTypes.object.isRequired,
};

ProductCardWidget.defaultProps = {
  routeParams: {},
};

export default ProductCardWidget;
