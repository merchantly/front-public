import React, { Component } from 'react'; import PropTypes from 'prop-types';
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
} from 'r/actions/GoodStateActions';
import connectToRedux from 'rc/HoC/connectToRedux';
import { connect } from 'react-redux';
import { getIn } from 'timm';
import URI from 'urijs';

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.handleGoodChange = this.handleGoodChange.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      amount: props.product.sellingByWeight ? props.product.weightOfPrice : 1 ,
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
      newOrderUrl,
      isOneClickBuy
    } = this.props;
    const {
      amount,
      good,
      product,
    } = this.state;

    ev.preventDefault();

    if (isOneClickBuy) {
      // TODO поддержка multipleChoice
      document.location = URI(newOrderUrl).setQuery({'cart_item[good_id]': good.globalId});
    } else {
      return product.sellingByWeight
        ? addGood(good, 1, amount)
        : addGood(good, amount);
    }
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
      goodState,
      similarProducts,
      otherProducts,
      t,
      multipleChoice,
      deliveryRestrictionMessages
    } = this.props;
    const {
      good,
      product,
    } = this.state;

    const isAddingGood = !!getIn(goodState, [good && good.globalId, 'isFetching']) ||
      !!getIn(goodState, [product.globalId, 'isFetching']);

    const selectedImage = (good && good.image) ? good.image : null;

    return (
      <div className="mrch-ProductCard">
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
                  selectedImage={selectedImage}
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
                {!multipleChoice &&
                  <div className="b-item-full__form">
                    <ProductCart
                      {...this.props}
                      {...this.state}
                      isAddingGood={isAddingGood}
                      onChangeAmount={this.handleChangeAmount}
                      onGoodChange={this.handleGoodChange}
                      onSubmit={this.handleFormSubmit}
                      t={t}
                    />
                  </div>
                }
                <ProductCardDetails
                  otherProducts={otherProducts}
                  product={product}
                  t={t}
                  deliveryRestrictionMessages={deliveryRestrictionMessages}
                />
              </div>
              <ProductCardVideo product={product} />
            </div>
            {multipleChoice &&
              <div>
                <ProductCart
                  {...this.props}
                  {...this.state}
                  isAddingGood={isAddingGood}
                  onChangeAmount={this.handleChangeAmount}
                  onGoodChange={this.handleGoodChange}
                  onSubmit={this.handleFormSubmit}
                  t={t}
                />
              </div>
            }
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
  goodState: PropTypes.object.isRequired,
  hasWishlist: PropTypes.bool,
  hasComments: PropTypes.bool,
  disqusUrl: PropTypes.string,
  isWishlisted: PropTypes.bool,
  product: schemas.product,
  similarProducts: PropTypes.arrayOf(schemas.product),
  otherProducts: PropTypes.arrayOf(schemas.product),
  wishlistUrl: PropTypes.string,
  multipleChoice: PropTypes.bool,
  isOneClickBuy: PropTypes.bool,
  newOrderUrl: PropTypes.string,
  t: PropTypes.func.isRequired,
  deliveryRestrictionMessages: PropTypes.arrayOf(PropTypes.string)
};

ProductCard.defaultProps = {
  formAuthenticity: {},
  hasComments: false,
  disqusUrl: '',
  product: {},
  multipleChoice: false,
  isOneClickBuy: false,
  similarProducts: [],
  otherProducts: [],
  deliveryRestrictionMessages: []
};

export default provideTranslations(connectToRedux(connect(
  (state) => ({
    goodState: state.goodState,
  }),
  {
    addGood,
  }
)(ProductCard)));
