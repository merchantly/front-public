import React, { Component, PropTypes } from 'react';
import provideTranslations from '../../HoC/provideTranslations';
import ProductCart from '../ProductCart';
import ProductPrices from '../ProductPrices';
import ProductCardBadges from './ProductCardBadges';
import ProductCardBreadcrumbs from './ProductCardBreadcrumbs';
import ProductCardDetails from './ProductCardDetails';
import ProductCardGallery from './ProductCardGallery';
import ProductCardSchema from './ProductCardSchema';
import ProductCardSimilarProducts from './ProductCardSimilarProducts';
import ProductCardTitle from './ProductCardTitle';
import ProductCardVideo from './ProductCardVideo';
import ReactDisqusThread from 'react-disqus-thread';
import { DISQUS_IDENTIFIER } from './ProductCard.constants';
import * as schemas from 'r/schemas';
import {
  addGood,
} from 'r/actions/BasketActions';
import connectToRedux from 'rc/HoC/connectToRedux';
import { connect } from 'react-redux';
import { getIn } from 'timm';

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.handleGoodChange = this.handleGoodChange.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      amount: props.product.selling_by_weight ? props.product.weight_of_price : 1 ,
      good: getIn(props.product, ['goods', 0]),
      product: props.product,
    };
  }
  isKioskEnvironment() {
    return !!(global.gon && global.gon.kiiiosk);
  }
  handleGoodChange(good) {
    const article = good && good.article || this.state.product.article;
    const product = {
      ...this.state.product,
      article,
    };

    this.setState({ good, product });
  }
  handleChangeAmount(amount) {
    this.setState({ amount });
  }
  handleFormSubmit(ev) {
    const {
      addGood,
    } = this.props;
    const {
      amount,
      good,
      product,
    } = this.state;

    ev.preventDefault();

    return product.selling_by_weight
      ? addGood(good, 1, amount)
      : addGood(good, amount);
  }
  renderDisqus(product) {
    let disqusIdentifier = DISQUS_IDENTIFIER + product.id;

    if (this.props.hasComments && this.props.disqusUrl && this.props.disqusUrl.trim()) {
      return (
        <ReactDisqusThread
          identifier={disqusIdentifier}
          shortname={this.props.disqusUrl}
        />
      );
    }else{
      return null;
    }
  }
  render() {
    const {
      similarProducts,
      otherProducts,
      t,
    } = this.props;
    const {
      good,
      product,
    } = this.state;

    return (
      <div className="mrch-ProductCard cleanslate">
        <div
          className="b-page__content__inner b-page__content__inner_content h-product"
          itemScope
          itemType="http://schema.org/Product"
        >
          <div className="b-item-full">
            <div className="b-item-full__header b-item-full__header_mobile">
              <ProductCardBreadcrumbs product={product} />
              <ProductCardTitle product={product} />
              <ProductCardBadges product={product} t={t} />
            </div>

            <div className="b-item-full__content">
              <div className="b-item-full__gallery">
                <ProductCardGallery
                  images={product.images}
                  isKioskEnvironment={this.isKioskEnvironment()}
                  t={t}
                />
              </div>
              <div className="b-item-full__description">
                <div className="b-item-full__header">
                  <ProductCardBreadcrumbs className="p-category" product={product} />
                  <ProductCardTitle className="p-name" product={product} />
                  <ProductCardBadges product={product} t={t} />
                </div>
                <div className="b-item-full__price p-price">
                  <ProductPrices
                    good={good}
                    product={product}
                    t={t}
                  />
                </div>
                <ProductCardSchema product={product} />
                <div className="b-item-full__form">
                  <ProductCart
                    {...this.props}
                    {...this.state}
                    onChangeAmount={this.handleChangeAmount}
                    onGoodChange={this.handleGoodChange}
                    onSubmit={this.handleFormSubmit}
                    t={t}
                  />
                </div>
                <ProductCardDetails
                  otherProducts={otherProducts}
                  product={product}
                  t={t}
                />
              </div>
              <ProductCardVideo product={product} />
            </div>
            <ProductCardSimilarProducts products={similarProducts} t={t} />
            {this.renderDisqus(product)}
          </div>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  addGood: PropTypes.func.isRequired,
  addWishlistUrl: PropTypes.string,
  formAuthenticity: schemas.formAuthenticity,
  hasWishlist: PropTypes.bool,
  hasComments: PropTypes.bool,
  disqusUrl: PropTypes.string,
  isWishlisted: PropTypes.bool,
  product: schemas.product,
  similarProducts: PropTypes.arrayOf(schemas.product),
  otherProducts: PropTypes.arrayOf(schemas.product),
  wishlistUrl: PropTypes.string,
  t: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  formAuthenticity: {},
  hasComments: false,
  disqusUrl: '',
  product: {},
  similarProducts: [],
  otherProducts: [],
};

export default provideTranslations(connectToRedux(connect(
  () => ({}),
  {
    addGood,
  }
)(ProductCard)));
