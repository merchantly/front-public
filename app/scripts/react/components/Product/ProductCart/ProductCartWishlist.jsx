import React, { Component, PropTypes } from 'react';
import Icon from '../../common/Icon';
import Link from '../../common/Link';
import URI from 'urijs';
import { wishlistCall } from 'r/actions/WishlistStateActions';
import { fetchClientState } from 'r/actions/ClientStateActions';
import connectToRedux from 'rc/HoC/connectToRedux';
import { connect } from 'react-redux';
import { getIn } from 'timm';
import { includes } from 'lodash';

class ProductCartWishlist extends Component {
  static propTypes = {
    addWishlistText: PropTypes.string,
    addWishlistUrl: PropTypes.string,
    good: PropTypes.object,
    goWishlistText: PropTypes.string,
    product: PropTypes.object.isRequired,
    hasWishlist: PropTypes.bool,
    isWishlisted: PropTypes.bool,
    wishlistUrl: PropTypes.string,
    addToWishlist: PropTypes.func.isRequired,
    fetchClientState: PropTypes.func.isRequired,
  };

  static contextTypes = {
    isWidget: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      isFetching: false      
    };
  }

  wishApiCall(method) {
    const { wishlistCall, fetchClientState, good } = this.props;
       
    wishlistCall(good.globalId, method).then((response) => {      
      fetchClientState(true);
    });
  }

  addToWishListClick(event) {    
    event.preventDefault();    
    event.stopPropagation();
    this.wishApiCall('post');
  }

  removeToWishListClick(event) {
    event.preventDefault();    
    event.stopPropagation(); 
    this.wishApiCall('delete');
  }

  render() {
    const {
      addWishlistText,
      addWishlistUrl,
      goWishlistText,
      hasWishlist,
      //isWishlisted, Теперь берем из clientState
      wishlistUrl,
      goodId,
      wishlist,
      good,
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

    var global_id, product_id;

    if (good && good.globalId) {
      global_id = good.globalId;
    } else if (product && product.globalId) {
      global_id = product.globalId;
    }

    if (product && product.id) {
      product_id = product.id;
    }

    if (!global_id || !product_id) {
      return null;
    }

    var isFetching = getIn(wishlist, [global_id, "isFetching"]);
    var isWishlisted = false;

    if (includes(clientState.data["wishlitedProductIds"], product_id)) {
      isWishlisted = true;
    }

    if (hasWishlist && (wishlistUrl || addWishlistUrl)) {
      let content;
      var button_text;

      if (isWishlisted) {
        // Был текст на кпопке goWishlistText (vendor.button.go_wishlist) – как бы перейти в виш-лист
        // Нужно добавить перевод vendor.button.remove_from_wish_list – типа: не хочу!
        button_text = t('vendor.button.remove_from_wish_list');
      } else {
        button_text = addWishlistText;
      }
      if (isFetching) {
        // Нужно добавить перевод vendor.button.adding_to_wish_list – типа: Добавляем...
        button_text = t('vendor.button.adding_to_wish_list');
      }

      if (isWishlisted) {
        content = (
          <button className="add-to-wishlist__add-button" onClick={this.removeToWishListClick.bind(this)}> 
            <Icon active name="wishlist" />
            {button_text}
          </button>
        );
      } else {
        content = (
          <button className="add-to-wishlist__add-button" onClick={this.addToWishListClick.bind(this)}> 
            <Icon active name="wishlist" />            
            {button_text}
          </button>          
        );
      }

      return (
        <div className="add-to-wishlist">
          <noindex>
            {content}
          </noindex>
        </div>
      );
    }

    return null;
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
