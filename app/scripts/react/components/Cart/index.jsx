import React, { Component, PropTypes } from 'react';
import Cart from './Cart';
import provideTranslations from '../HoC/provideTranslations';
import connectToRedux from '../HoC/connectToRedux';
import { connect } from 'react-redux';
import {
  setAmount as changeAmount,
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
    this.selectPackage = this.selectPackage.bind(this);
  }
  componentWillMount() {
    const {
      initCart,
      initialCart,
      initPackages,
      initialPackages,
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
  formAuthenticity: PropTypes.object,
  initialCart: PropTypes.object,
  initialPackages: PropTypes.array,
  isTesting: PropTypes.bool,
  minimalPrice: schemas.money,

  // calculated props
  amounts: PropTypes.object.isRequired,
  cartDefaultUrl: PropTypes.string.isRequired,
  cartErrors: PropTypes.object.isRequired,
  cartIsFetching: PropTypes.bool.isRequired,
  cartItems: PropTypes.array.isRequired,
  changeAmount: PropTypes.func.isRequired,
  couponCode: PropTypes.string,
  fetchCart: PropTypes.func.isRequired,
  fetchPackages: PropTypes.func.isRequired,
  initCart: PropTypes.func.isRequired,
  initPackages: PropTypes.func.isRequired,
  isBelowMinimalPrice: PropTypes.bool.isRequired,
  packageItem: PropTypes.object.isRequired,
  packages: PropTypes.array.isRequired,
  packagesIsFetching: PropTypes.bool.isRequired,
  prices: PropTypes.object.isRequired,
  selectPackage: PropTypes.func.isRequired,
  selectedPackage: PropTypes.string,
  t: PropTypes.func.isRequired,
  totalPrice: PropTypes.object.isRequired,
};

CartContainer.defaultProps = {
  formAuthenticity: {
    method: 'patch',
  },
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
        defaultUrl: cartDefaultUrl='',
        errors: cartErrors={},
        items: cartItems=[],
        packageItem,
        totalPrice: cartTotalPrice={},
      },
      isFetching: cartIsFetching=false,
      amounts={},
      coupon,
      selectedPackage,
    } = cart;
    const {
      packages=[],
      isFetching: packagesIsFetching=false,
    } = packagesStore;
    const couponCode = coupon && coupon.value || '';

    const prices = mapValues(amounts, (amount, itemId) => {
        const item = find(cartItems, (i) => String(i.id) === itemId) || {};
        const actualPrice = getIn(item, ['good', 'actualPrice']) || {};
        const isWeighted = getIn(item, ['good', 'sellingByWeight']) || false;
        const koeff = isWeighted ? (1 / (getIn(item, ['good', 'weightOfPrice']) || 1)) : 1;

        return set(actualPrice, 'cents', amount * koeff * (actualPrice.cents || 0));
      });
    const selectedPackagePrice = selectedPackage
      ? (getIn(find(packages, (p) => p.globalId === selectedPackage), ['price', 'cents']) || 0)
      : 0;
    const packagePrice = !isEmpty(packageItem)
      ? getIn(packageItem, ['good', 'actualPrice', 'cents'])
      : selectedPackagePrice;
    const totalPrice = set(
      cartTotalPrice,
      'cents',
      reduce(prices, (acc, price) => acc + (price.cents || 0), packagePrice)
    );
    const isBelowMinimalPrice = !!minimalPrice && ((totalPrice.cents || 0) < minimalPrice.cents);

    return {
      amounts,
      cartDefaultUrl,
      cartErrors,
      cartIsFetching,
      cartItems,
      couponCode,
      isBelowMinimalPrice,
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
    selectPackage,
    initCart,
    fetchCart,
    initPackages,
    fetchPackages,
  }
)(CartContainer)));
