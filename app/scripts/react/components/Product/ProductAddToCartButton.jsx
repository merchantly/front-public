import React, { PropTypes } from 'react';

const ProductAddToCartButton = ({ disabled, isAddingGood, t, text }) => (
  <button
    className="b-btn element--active-opacity"
    disabled={disabled || isAddingGood}
    name="to_cart"
    type="submit"
  >
    {isAddingGood ? t('vendor.button.disable_with.adding') : text}
  </button>
);

ProductAddToCartButton.propTypes = {
  disabled: PropTypes.bool,
  isAddingGood: PropTypes.bool,
  t: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default ProductAddToCartButton;
