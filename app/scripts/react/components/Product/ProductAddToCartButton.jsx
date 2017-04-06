import React, { PropTypes, Component } from 'react';

class ProductAddToCartButton extends Component {
  render() {
    const {
      disabled,
      isAddingGood,
      t,
      text,
      onClick,
    } = this.props;
    const {
      isWidget,
    } = this.context;
    const buttonText = isWidget ? t('vendor.button.to_cart') : text;

    return (
      <button
        className="b-btn element--active-opacity"
        disabled={disabled || isAddingGood}
        name="to_cart"
        onClick={onClick}
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
};

ProductAddToCartButton.contextTypes = {
  isWidget: PropTypes.bool,
};

export default ProductAddToCartButton;
