import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../common/Icon';
import { wishlistCall } from 'r/actions/WishlistStateActions';
import { fetchClientState } from 'r/actions/ClientStateActions';
import connectToRedux from 'rc/HoC/connectToRedux';
import { connect } from 'react-redux';
import { getIn } from 'timm';
import { includes } from 'lodash-es';
import ProductCartWishlistButton from './ProductCartWishlistButton';
import ProductCartWishlistButtonFetching from './ProductCartWishlistButtonFetching';
import ProductCartWishlistButtonRemove from './ProductCartWishlistButtonRemove';
import * as schemas from 'r/schemas';
import {
  WISHLIST_BUTTON_ADD_TO_WISH_LIST,
  WISHLIST_BUTTON_REMOVE_FROM_WISH_LIST,
  WISHLIST_BUTTON_FETCHING,
} from 'r/actions/WishlistStateActions';
//import invariant from 'invariant';

class ProductCartWishlist extends Component {
  static propTypes = {
    wishlistCall: PropTypes.func.isRequired,
    fetchClientState: PropTypes.func.isRequired,
    product: schemas.product.isRequired,
    t: PropTypes.func.isRequired,
  };

  static contextTypes = {
    isWidget: PropTypes.bool,
  };

  wishApiCall(method) {
    const { wishlistCall, fetchClientState, product } = this.props;
    const global_id = product && product.globalId;

    wishlistCall(global_id, method).then((response) => {
      fetchClientState(true);
    });
  }

  addToWishListClick(event) {
    event.preventDefault();
    event.stopPropagation();
    $(window).trigger('m.add-to-wishlist', [this.props.product]);
    this.wishApiCall('post');
  }

  removeToWishListClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.wishApiCall('delete');
  }

  render() {
    const {
      wishlist,
      product,
      clientState,
      t,
    } = this.props;

    const {
      isWidget
    } = this.context;

    if (isWidget) {
      return null;
    }

    const global_id = product && product.globalId, product_id = product && product.id;
    const hasWishlist = clientState && clientState.data && clientState.data.hasWishlist;
    const isFetching = getIn(wishlist, ["data", "isFetching"]);
    const isWishlisted = (clientState && clientState.data) ? includes(clientState.data["wishlitedProductIds"], product_id) : false;
    var wishlistButtonState;

    if (!hasWishlist) {
      return null;
    }

    if (!global_id || !product_id) {
      //invariant(false, "У компонента нет props.product!");
      return null;
    }

    if (isWishlisted) {
      wishlistButtonState = WISHLIST_BUTTON_REMOVE_FROM_WISH_LIST;
    } else {
      wishlistButtonState = WISHLIST_BUTTON_ADD_TO_WISH_LIST;
    }

    if (isFetching) {
      wishlistButtonState = WISHLIST_BUTTON_FETCHING;
    }

    switch(wishlistButtonState) {
      case WISHLIST_BUTTON_ADD_TO_WISH_LIST:
        return (<ProductCartWishlistButton title={t('vendor.button.to_wishlist')} onClick={this.addToWishListClick.bind(this)}/>)
      case WISHLIST_BUTTON_REMOVE_FROM_WISH_LIST:
        return (<ProductCartWishlistButtonRemove title={t('vendor.button.remove_from_wish_list')} onClick={this.removeToWishListClick.bind(this)}/>)
      case WISHLIST_BUTTON_FETCHING:
        return (<ProductCartWishlistButtonFetching title={t('vendor.button.adding_to_wish_list')}/>)
      default:
        return null;
    }
  }
}

export default connectToRedux(connect(
  (state) => ({
    clientState: state.clientState,
    wishlist: state.wishlist,
  }),
  {
    wishlistCall,
    fetchClientState,
  }
)(ProductCartWishlist));
