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
import { Map, List } from 'immutable';

const emptyErrors = Map();
const emptyAmounts = Map();
const emptyItems = List();
const emptyItem = Map();
const emptyPrice = Map();

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
      initCart(initialCart);
      initPackages(initialPackages);
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

  // calculated props
  amounts: PropTypes.object.isRequired,
  cartDefaultUrl: PropTypes.string.isRequired,
  cartErrors: PropTypes.object.isRequired,
  cartIsFetching: PropTypes.bool.isRequired,
  cartItems: PropTypes.object.isRequired,
  changeAmount: PropTypes.func.isRequired,
  couponCode: PropTypes.string,
  fetchCart: PropTypes.func.isRequired,
  fetchPackages: PropTypes.func.isRequired,
  initCart: PropTypes.func.isRequired,
  initPackages: PropTypes.func.isRequired,
  packageItem: PropTypes.object.isRequired,
  packages: PropTypes.object.isRequired,
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
    } = ownProps;
    const {
      cart,
      packages: packagesStore,
    } = storeInitialized && !isTesting
      ? state
      : ({
        cart: initCartStore(state.cart, initCart(initialCart)),
        packages: initPackageStore(state.packages, initPackages(initialPackages)),
      });

    const cartDefaultUrl = cart.getIn(['cart', 'defaultUrl'], '');
    const cartErrors = cart.getIn(['cart', 'errors'], emptyErrors);
    const cartItems = cart.getIn(['cart', 'items'], emptyItems);
    const cartIsFetching = cart.get('isFetching', false);
    const packageItem = cart.getIn(['cart', 'packageItem']) || emptyItem;
    const packagesIsFetching = packagesStore.get('isFetching', false);
    const packages = packagesStore.get('packages', emptyItems);
    const selectedPackage = cart.get('selectedPackage', null);
    const amounts = cart.get('amounts', emptyAmounts);
    const couponCode = cart.getIn(['coupon', 'value'], '');
    const prices = amounts
      .map((amount, itemId) => {
        const item = cartItems.find(((i) => i.get('id') === itemId), Map());
        const actualPrice = item.getIn(['good', 'actualPrice'], emptyPrice);
        const isWeighted = item.getIn(['good', 'sellingByWeight'], false);
        const koeff = isWeighted ? (1 / item.getIn(['good', 'weightOfPrice'], 1)) : 1;

        return actualPrice.set('cents', amount * koeff * actualPrice.get('cents', 0));
      });
    const selectedPackagePrice = selectedPackage
      ? packages.find((p) => p.get('globalId') === selectedPackage, Map()).getIn(['price', 'cents'], 0)
      : 0;
    const packagePrice = !packageItem.isEmpty()
      ? packageItem.getIn(['good', 'actualPrice', 'cents'])
      : selectedPackagePrice;
    const totalPrice = cart
      .getIn(['cart', 'totalPrice'], emptyPrice)
      .set('cents', prices.reduce(((acc, price) => acc + price.get('cents', 0)), packagePrice));

    return {
      amounts,
      cartDefaultUrl,
      cartErrors,
      cartIsFetching,
      cartItems,
      couponCode,
      packageItem,
      packages,
      packagesIsFetching,
      prices,
      selectedPackage,
      totalPrice,
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
