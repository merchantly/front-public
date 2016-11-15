import React, { Component, PropTypes } from 'react';
import HumanizedMoneyWithCurrency from 'rc/common/Money/HumanizedMoneyWithCurrency';

class ProductBulk extends Component {
  constructor(props) {
    super(props);

    if (this.good()){
      this.state = {
        price: {
          cents: this.getPrice(props.product.weight_of_price),
          currency_iso_code: this.good().actual_price.currency_iso_code,
        },
      };
    }
  }
  good() {
    if (this.props.good) {
      return this.props.good;
    } else if (this.props.product.has_ordering_goods) {
      return this.props.product.goods[0];
    }
  }
  onWeightChange(e) {
    let value = parseFloat(e.target.value);

    if (isNaN(value)){
      value = 0;
    }

    this.props.onChangeAmount(value);
    this.setState({
      price: {
        cents: this.getPrice(value),
        currency_iso_code: this.good().actual_price.currency_iso_code,
      },
    });
  }
  getPrice(weight){
    return this.good().actual_price.cents * weight / parseFloat(this.props.product.weight_of_price);
  }
  render() {
    const {
      amount,
      t,
    } = this.props;

    if (this.good()){
      return (
        <div>
          <span>
            <span>
              {t('vendor.product.weight')}
            </span>
            <input
              className="string form-control"
              name="cart_item[weight]"
              onChange={this.onWeightChange.bind(this)}
              ref="input"
              step="0.01"
              type="number"
              value={amount}
            />
          </span>
          <div className="b-item-full__price p-price">
            <div className="b-item__price">
              <HumanizedMoneyWithCurrency money={this.state.price} />
            </div>
          </div>
        </div>
      );
    }else{
      return null;
    }
  }
}

ProductBulk.propTypes = {
  amount: PropTypes.number.isRequired,
  good: PropTypes.object.isRequired,
  onChangeAmount: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default ProductBulk;
