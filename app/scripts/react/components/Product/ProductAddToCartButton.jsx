import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductAddToCartButton extends Component {
  componentDidMount() {
    const $tooltip = $('.b-btn-add-cart').tooltip({
      title: this.props.t('vendor.button.to_cart_tooltip'),
      trigger: 'click',
      placement: 'bottom',
      trigger: 'manual'
    });

    this.setState({tooltip: $tooltip})
  }

  render() {
    const {
      disabled,
      isAddingGood,
      t,
      text,
      onClick,
      good,
    } = this.props;
    const {
      isWidget,
    } = this.context;
    const buttonText = isWidget ? t('vendor.button.to_cart') : text;

    const handler = function (e) {
      // good.globalId
      // good.actualPrice.id

      const {
        tooltip
      } = this.state

      tooltip.tooltip('show');

      setTimeout(() => {
        tooltip.tooltip('hide');
      }, 3000);

      try {
        $(window).trigger('m.add-to-cart', [good, 1]);
      } catch (e) {
        console.log('trigger: ', e.message);
      }

      if (onClick) { onClick(); };
    };

    return (
      <button
        className="b-btn b-btn-add-cart element--active-opacity"
        disabled={disabled || isAddingGood}
        name="to_cart"
        onClick={handler.bind(this)}
        type={ onClick ? 'button' : 'submit' }
      >
        {isAddingGood ? t('vendor.button.disable_with.adding') : buttonText}
      </button>
    );
  }
}

ProductAddToCartButton.propTypes = {
  disabled: PropTypes.bool,
  isAddingGood: PropTypes.bool,
  t: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  good: PropTypes.object,
};

ProductAddToCartButton.contextTypes = {
  isWidget: PropTypes.bool,
};

export default ProductAddToCartButton;
