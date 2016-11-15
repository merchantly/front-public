import React, { Component, PropTypes } from 'react';
import { h1 } from '../../../helpers/seo';
import { attributeValue } from '../../../helpers/product';
import ProductBlockImage from '../ProductBlock/ProductBlockImage';
import AppLink from 'rc/common/AppLink';
import { productRoute } from 'scripts/routes/app';

export default class ProductCardDetails extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    otherProducts: PropTypes.array,
    t: PropTypes.func,
  };
  static defaultProps = {
    otherProducts: [],
  };
  renderAttributes(product) {
    if (product.attributes && product.attributes.length) {
      return (
        <ul className="b-characteristics" ref="attributes">
          {
            product.attributes.map((attr, idx) =>
              <li className={'b-characteristics-li-property_' + attr.property_id} key={idx}>
                {attributeValue(attr)}
              </li>
            )
          }
        </ul>
      );
    }
  }
  renderDescription(product) {
    if (product.description) {
      return (
        <div
          className="b-item-full__text e-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
          itemProp="description"
          ref="description"
        />
      );
    } else {
      return <meta content={h1(product)} itemProp="description" />;
    }
  }
  renderTextBlocks(product) {
    if (product.text_blocks && product.text_blocks.length) {
      return (
        <span ref="textBlocks">
          {
            product.text_blocks.map((block, idx) =>
              <div className="b-item-full__text" key={idx}>
                <h4>{block.title}</h4>
                <span dangerouslySetInnerHTML={{ __html: block.content }} />
              </div>
            )
          }
        </span>
      );
    }
  }

  renderOtherProducts() {
    const {
      otherProducts,
      t,
    } = this.props;

    if (otherProducts.length > 0) {
      return (
        <span>
          <h3>{t('vendor.other_product.title')}</h3>
          <ul className="b-item-full__other-products">
            {
              otherProducts.map((product) => (
                <li key={product.id}>
                  <AppLink
                    alt={product.title}
                    hash={productRoute(product.id)}
                    href={product.public_url}
                    title={product.title}
                  >
                    <ProductBlockImage product={product} />
                  </AppLink>
                </li>
              ))
            }
          </ul>
        </span>
      );
    }

    return null;
  }
  render() {
    const { product } = this.props;

    if (product) {
      return (
        <span>
          <span dangerouslySetInnerHTML={{ __html: product.custom_product_html }} />
          {this.renderDescription(product)}
          {this.renderAttributes(product)}
          {this.renderTextBlocks(product)}
          {this.renderOtherProducts()}
        </span>
      );
    } else {
      return null;
    }
  }
}
