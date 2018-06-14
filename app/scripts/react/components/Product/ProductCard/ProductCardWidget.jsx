import React, { Component } from 'react'; import PropTypes from 'prop-types';
import WidgetLayout from 'rc/Widget/WidgetLayout';
import ProductCardContainer from './ProductCardContainer';

class ProductCardWidget extends Component {
  render() {
    const {
      productId,
    } = this.props.routeParams;

    return (
      <WidgetLayout>
        <ProductCardContainer productId={parseInt(productId, 10)} />
      </WidgetLayout>
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
