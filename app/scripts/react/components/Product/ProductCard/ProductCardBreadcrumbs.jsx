import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { productCategoryPath } from '../../../helpers/vendors';

export default class ProductCardBreadcrumbs extends Component {
  static propTypes = {
    className: PropTypes.string,
    product: PropTypes.object.isRequired,
  }
  render() {
    const { className, product } = this.props;

    if (product.category) {
      return (
        <div className={classNames('b-breadcrumbs', className)}>
          {productCategoryPath(product)}
        </div>
      );
    } else {
      return null;
    }
  }
}
