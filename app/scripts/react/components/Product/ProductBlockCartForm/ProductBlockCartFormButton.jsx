import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  addGood,
  resetGoodState,
} from 'r/actions/GoodStateActions';
import InputNumberSpinner from '../../common/InputNumberSpinner';
import connectToRedux from 'rc/HoC/connectToRedux';
import { connect } from 'react-redux';
import { getIn } from 'timm';

class ProductBlockCartFormButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: props.product.sellingByWeight ? parseFloat(props.product.weightOfPrice) : 1
    }
  }
  componentWillMount() {
    const {
      goodId,
      resetGoodState,
    } = this.props;

    resetGoodState(goodId);
  }
  onChangeAmount(value) {
    this.setState({ amount: value });
  }
  addToBasket() {
    const {
      addGood,
      product,
    } = this.props;
    const {
      amount,
    } = this.state;

    let good = product.goods[0];
    good.title = product.title;
    $(window).trigger('m.add-to-cart', [good, amount]);

    return product.sellingByWeight
      ? addGood(product.goods[0], 1, amount)
      : addGood(product.goods[0], amount);
  }
  renderQuanity() {
    const {
      product,
    } = this.props;
    let step, defaultValue, min;

    if (product.sellingByWeight) {
      step = 0.01;
      min = step;
      defaultValue = parseFloat(product.weightOfPrice);
    } else {
      step = 1;
      defaultValue = 1;
      min = step;
    }
    return (
      <InputNumberSpinner
        min={min}
        onChange={this.onChangeAmount.bind(this)}
        step={step}
        value={this.state.amount || defaultValue}
      />
    );
  }
  render() {
    const {
      isFetching,
      showQuantity,
      t,
    } = this.props;
    const text = isFetching
      ? t('vendor.button.disable_with.adding')
      : t('vendor.button.to_cart');

    return (
      <div>
        {showQuantity && this.renderQuanity()}
        <button
          className="b-btn b-btn-add-cart element--active"
          disabled={isFetching}
          onClick={this.addToBasket.bind(this)}
        >
          {text}
        </button>
      </div>
    );
  }
}
ProductBlockCartFormButton.propTypes = {
  addGood: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  goodId: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  resetGoodState: PropTypes.func.isRequired,
  showQuantity: PropTypes.bool,
  t: PropTypes.func,
};

ProductBlockCartFormButton.defaultProps = {
  showQuantity: false,
};

export default connectToRedux(connect(
  (state, { product }) => {
    const goodId = product.goods[0].globalId;

    return {
      goodId,
      isFetching: !!getIn(state.goodState, [goodId, 'isFetching']),
    };
  },
  {
    addGood,
    resetGoodState,
  }
)(ProductBlockCartFormButton));
