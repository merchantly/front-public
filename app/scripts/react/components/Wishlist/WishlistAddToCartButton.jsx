import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WishlistAddToCartButton extends Component {
  render() {
    const {
      id,
      href,
      title,
      good,
      isInCart,
      t,
    } = this.props;

    let handler = function() {
      try {
        $(window).trigger('m.add-to-cart', [good, 1]);
      } catch (e) {
        console.log('trigger: ', e.message);
      }
    };

    return (
      <div className="b-add-cart-button">
        {isInCart
          ? (
            <div className="b-add-cart-button-text">
              {t('vendor.button.already')}
            </div>
          )
          : (
          <a
            className="b-btn b-btn-add-cart element--active-opacity"
            data-method="post"
            data-disable-with={t('vendor.button.disable_with.adding')}
            onClick={handler}
            href={href}
          >
            {t('vendor.button.to_cart', { title })}
          </a>
          )
        }
      </div>
    );
  }
}

WishlistAddToCartButton.propTypes = {
  id: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isInCart: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default WishlistAddToCartButton;
