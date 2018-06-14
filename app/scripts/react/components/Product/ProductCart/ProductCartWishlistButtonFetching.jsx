import React, { Component } from 'react'; import PropTypes from 'prop-types';
import Icon from '../../common/Icon';

export default class ProductCartWishlistButtonFetching extends Component {
  static propTypes = {    
    title: PropTypes.string.isRequired,
  };

  render() {
    const {
      title,
    } = this.props;

    return (
      <div className="add-to-wishlist">
        <noindex>
          <button className="add-to-wishlist__add-button"> 
            <Icon active name="wishlist" />
            {title}
          </button> 
        </noindex>
      </div>
    );

  }

}