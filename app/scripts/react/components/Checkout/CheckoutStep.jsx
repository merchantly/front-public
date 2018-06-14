import React, { Component } from 'react'; import PropTypes from 'prop-types';

class CheckoutStep extends Component {
  render() {
    const { children, number, title } = this.props;
    return (
      <div className="b-form__row b-cart__form__data-row">
        <div className="b-form__row__num">
          {number}
        </div>
        <div className="b-form__row__content">
          <div className="b-form__row__title">
            {title}
          </div>
          <div className="b-form__row__items">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

CheckoutStep.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default CheckoutStep;