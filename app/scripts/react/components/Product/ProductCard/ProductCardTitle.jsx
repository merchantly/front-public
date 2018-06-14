import React, { Component } from 'react'; import PropTypes from 'prop-types';
import classNames from 'classnames';
import { h1 } from '../../../helpers/seo';

export default class ProductCardTitle extends Component {
  static propTypes = {
    className: PropTypes.string,
    product: PropTypes.object.isRequired,
  }
  render() {
    const { className, product } = this.props;

    return (
      <h1 className={classNames('b-item-full__title', className)}>
        {h1(product)}
        {product.article &&
          <span className="b-item-full__articul">
            {' '}
            {product.article}
          </span>
        }
      </h1>
    );
  }
}