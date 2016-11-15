import React, { PropTypes } from 'react';

const ProductAddToCartButton = ({ disabled, t, text }) => (
  <button
    className="b-btn element--active-opacity"
    data-disable-with={t('vendor.button.disable_with.adding')}
    disabled={disabled}
    name="to_cart"
    type="submit"
  >
    {text}
  </button>
);

ProductAddToCartButton.propTypes = {
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default ProductAddToCartButton;
