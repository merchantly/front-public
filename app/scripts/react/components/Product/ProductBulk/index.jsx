import React, { Component, PropTypes } from 'react';
import HumanizedMoneyWithCurrency from 'rc/common/Money/HumanizedMoneyWithCurrency';
import * as schemas from 'r/schemas';

class ProductBulk extends Component {
  constructor(props) {
    super(props);

    if (this.good()){
      this.state = {
        price: {
          cents: this.getPrice(props.product.weightOfPrice),
          currencyIsoCode: this.good().actualPrice.currencyIsoCode,
        },
      };
    }
  }
  good() {
    if (this.props.good) {
      return this.props.good;
    } else if (this.props.product.hasOrderingGoods){
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
        currencyIsoCode: this.good().actualPrice.currencyIsoCode,
      },
    });
  }
  getPrice(weight){
    return this.good().actualPrice.cents * weight / parseFloat(this.props.product.weightOfPrice);
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
            <span>{t('vendor.product.weight')}</span>
            <input
              className="string form-control"
              defaultValue={this.props.product.weightOfPrice}
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
  good: schemas.good,
  amount: PropTypes.number.isRequired,
  onChangeAmount: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default ProductBulk;
