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
      const { category } = product.category

      return (
        <div className={classNames('b-breadcrumbs', className)} itemScope itemtype="https://schema.org/BreadcrumbList">
          {category.parent &&
            <div itemProp="itemListElement" itemScope itemtype="https://schema.org/ListItem">
              <meta itemProp="item" content={category.parent.publicUrl}/>
              <meta itemProp="name" content={category.parent.name}/>
              <meta itemProp="position" content={1}/>
            </div>
          }

          <div itemProp="itemListElement" itemScope itemtype="https://schema.org/ListItem">
            <meta itemProp="item" content={category.publicUrl} />
            <meta itemProp="name" content={category.name} />
            <meta itemProp="position" content={category.parent ? 2 : 1} />
          </div>

          {productCategoryPath(product)}
        </div>
      );
    } else {
      return null;
    }
  }
}
