import React, { Component, PropTypes } from 'react';
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
      amount: props.product.selling_by_weight ? parseFloat(props.product.weight_of_price) : 1,
    };
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

    return product.selling_by_weight
      ? addGood(product.goods[0], 1, amount)
      : addGood(product.goods[0], amount);
  }
  renderQuanity() {
    const {
      product,
    } = this.props;
    let step, defaultValue, min;

    if (product.selling_by_weight) {
      step = 0.01;
      min = step;
      defaultValue = parseFloat(product.weight_of_price);
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
          className="b-btn element--active"
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
  goodId: PropTypes.number.isRequired,
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
    const goodId = product.goods[0].global_id;

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
