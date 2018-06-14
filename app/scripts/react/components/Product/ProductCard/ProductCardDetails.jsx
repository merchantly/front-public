import React, { Component } from 'react'; import PropTypes from 'prop-types';
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
    deliveryRestrictionMessages: PropTypes.arrayOf(PropTypes.string),
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
              <li className={'b-characteristics-li-property_' + attr.propertyId} key={idx}>
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
    if (product.textBlocks && product.textBlocks.length) {
      return (
        <span ref="textBlocks">
          {
            product.textBlocks.map((block, idx) =>
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
          <noindex><div className="b-item-full__other-title">{t('vendor.other_product.title')}</div></noindex>
          <ul className="b-item-full__other-products">
            {
              otherProducts.map((product) => (
                <li key={product.id}>
                  <AppLink
                    alt={product.title}
                    hash={productRoute(product.id)}
                    href={product.publicUrl}
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

  renderDeliveryInfo(deliveryRestrictionMessages) {
    return(
      deliveryRestrictionMessages && deliveryRestrictionMessages.map((message) => <div className="b-item-full__text-delivery__message b-item-full__text e-description">{message}</div>)
    );
  }

  render() {
    const { product, deliveryRestrictionMessages } = this.props;

    if (product) {
      return (
        <span>
          <span dangerouslySetInnerHTML={{ __html: product.customProductHtml }} />
          {this.renderDeliveryInfo(deliveryRestrictionMessages)}
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
