import React, { PropTypes } from 'react';
import { product } from '../../../projectTypes';
import ProductBlock from '../ProductBlock';

export default class ProductCardSimilarProducts {
  static propTypes = {
    products: PropTypes.arrayOf(product),
  }
  static defaultProps = {
    products: []
  }
  renderProduct(product) {
    return <ProductBlock key={product.id} product={product} />;
  }
  render() {
    const { products } = this.props;

    if (products.length) {
      return (
        <section className="b-item-list b-item-list_additional">
          <h1 className="b-item-list__title">
            {'С этим товаром покупают также'}
          </h1>
          <div className="b-item-list__content">
            {products.map(this.renderProduct)}
          </div>
        </section>
      );
    } else {
      return null;
    }   
  }
}