import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cart from './Cart';
import provideTranslations from '../HoC/provideTranslations';
import connectToRedux from '../HoC/connectToRedux';
import { connect } from 'react-redux';
import {
  setAmount as changeAmount,
  setPackageCount as changePackageCount,
  selectPackage,
  initCart,
  fetchCart,
} from '../../actions/CartActions';
import {
  initPackages,
  fetchPackages,
} from '../../actions/PackagesActions';
import {
  initCartStore,
} from '../../reducers/cart';
import {
  initPackageStore,
} from '../../reducers/packages';
import {
  canUseDOM,
} from '../../helpers/dom';
import * as schemas from 'r/schemas';
import { getIn, set } from 'timm';
import { reduce, mapValues, find, isEmpty } from 'lodash';

let storeInitialized = false;

class CartContainer extends Component {
  constructor(props) {
    super(props);

    this.changeAmount = this.changeAmount.bind(this);
    this.changePackageCount = this.changePackageCount.bind(this);
    this.selectPackage = this.selectPackage.bind(this);
  }
  componentWillMount() {
    const {
      initCart,
      initialCart,
      initPackages,
      initialPackages
    } = this.props;

    if (!storeInitialized && canUseDOM()) {
      if (initialCart) {
        initCart(initialCart);
      }

      if (initialPackages) {
        initPackages(initialPackages);
      }
      storeInitialized = true;
    }
  }
  changeAmount(id, amount) {
    this.props.changeAmount(id, amount);
  }
  changePackageCount(count) {
    this.props.changePackageCount(count);
  }
  selectPackage(id) {
    this.props.selectPackage(id);
  }
  render() {
    return (
      <Cart {...this.props}
        changeAmount={this.changeAmount}
        selectPackage={this.selectPackage}
      />
    );
  }
}

CartContainer.propTypes = {
  // initial props
  continueShoppingUrl: PropTypes.string,
  formAuthenticity: PropTypes.object,
  initialCart: PropTypes.object,
  initialPackages: PropTypes.array,
  isHeaderButtons: PropTypes.bool,
  isTesting: PropTypes.bool,
  minimalPrice: schemas.money,
  deliveryRestrictionMessages: PropTypes.arrayOf(PropTypes.string),
  recommendedProducts: PropTypes.object,

  // calculated props
  amounts: PropTypes.object.isRequired,
  cartDefaultUrl: PropTypes.string.isRequired,
  cleanCartUrl: PropTypes.string.isRequired,
  cartErrors: PropTypes.object.isRequired,
  cartIsFetching: PropTypes.bool.isRequired,
  cartItems: PropTypes.array.isRequired,
  changeAmount: PropTypes.func.isRequired,
  changePackageCount: PropTypes.func.isRequired,
  couponCode: PropTypes.string,
  fetchCart: PropTypes.func.isRequired,
  fetchPackages: PropTypes.func.isRequired,
  initCart: PropTypes.func.isRequired,
  initPackages: PropTypes.func.isRequired,
  isBelowMinimalPrice: PropTypes.bool.isRequired,
  packageCount: PropTypes.number.isRequired,
  packageItem: PropTypes.object.isRequired,
  packages: PropTypes.array.isRequired,
  packagesIsFetching: PropTypes.bool.isRequired,
  prices: PropTypes.object.isRequired,
  selectPackage: PropTypes.func.isRequired,
  selectedPackage: PropTypes.string,
  t: PropTypes.func.isRequired,
  totalPrice: PropTypes.object.isRequired
};

CartContainer.defaultProps = {
  isHeaderButtons: false,
  formAuthenticity: {
    method: 'patch',
  },
  deliveryRestrictionMessages: [],
  recommendedProducts: { showCartButton: false, products: [] },
};

export default provideTranslations(connectToRedux(connect(
  (state, ownProps) => {
    const {
      initialCart,
      initialPackages,
      isTesting,
      minimalPrice,
    } = ownProps;
    const {
      cart,
      packages: packagesStore,
    } = storeInitialized && !isTesting
      ? state
      : ({
        cart: initCartStore(state.cart, initCart(initialCart || {})),
        packages: initPackageStore(state.packages, initPackages(initialPackages ||{})),
      });

    const {
      cart: {
        cleanCartUrl: cleanCartUrl,
        defaultUrl: cartDefaultUrl='',
        errors: cartErrors={},
        items: cartItems=[],
        packageItem,
        totalPrice: cartTotalPrice={},
        showCouponCode,
      },
      isFetching: cartIsFetching=false,
      amounts={},
      coupon,
      packageCount,
      selectedPackage,
    } = cart;
    const {
      packages=[],
      isFetching: packagesIsFetching=false,
    } = packagesStore;
    const couponCode = coupon && coupon.value || '';

    const prices = mapValues(amounts, (amount, itemId) => {
        const item = find(cartItems, (i) => String(i.id) === itemId) || {};
        const actualPrice = getIn(item, ['good', 'actualPrice', 'price']) || {};
        const isWeighted = getIn(item, ['good', 'sellingByWeight']) || false;
        const koeff = isWeighted ? (1 / (getIn(item, ['good', 'weightOfPrice']) || 1)) : 1;

        return set(actualPrice, 'cents', amount * koeff * (actualPrice.cents || 0));
      });
    const selectedPackageMoney = selectedPackage &&
      getIn(find(packages, (p) => p.globalId === selectedPackage), ['price']);
    const selectedPackagePrice = getIn(selectedPackageMoney, ['cents']) || 0;
    const packagePriceCents = !isEmpty(packageItem)
      ? getIn(packageItem, ['good', 'actualPrice', 'price', 'cents']) * packageCount
      : selectedPackagePrice * packageCount;
    const totalPrice = set(
      cartTotalPrice,
      'cents',
      reduce(prices, (acc, price) => acc + (price.cents || 0), packagePriceCents)
    );
    const isBelowMinimalPrice = !!minimalPrice && ((totalPrice.cents || 0) < minimalPrice.cents);
    const packagePrice = !isEmpty(packageItem)
      ? set(packageItem.good.actualPrice, 'price', 'cents', packagePriceCents)
      : set(selectedPackageMoney, 'cents', packagePriceCents);

    return {
      amounts,
      cartDefaultUrl,
      cleanCartUrl,
      cartErrors,
      cartIsFetching,
      cartItems,
      couponCode,
      showCouponCode,
      isBelowMinimalPrice,
      packageCount,
      packagePrice,
      packages,
      packagesIsFetching,
      prices,
      selectedPackage,
      totalPrice,
      packageItem: packageItem || {},
    };
  },
  {
    changeAmount,
    changePackageCount,
    selectPackage,
    initCart,
    fetchCart,
    initPackages,
    fetchPackages,
  }
)(CartContainer)));
