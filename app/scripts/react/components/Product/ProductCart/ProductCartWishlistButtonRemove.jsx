import React, { Component } from 'react'; import PropTypes from 'prop-types';
import Icon from '../../common/Icon';

export default class ProductCartWishlistButtonRemove extends Component {
  static propTypes = {    
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,    
  };

  render() {
    const {
      title,
      onClick,
    } = this.props;

    return (
      <div className="add-to-wishlist">
        <noindex>
          <button className="add-to-wishlist__add-button" onClick={onClick}> 
            <Icon active name="wishlist" />
            {title}
          </button> 
        </noindex>
      </div>
    );

  }

}