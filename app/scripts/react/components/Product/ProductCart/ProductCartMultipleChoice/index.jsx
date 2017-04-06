import React, { Component, PropTypes } from 'react';
import MultipleChoiceItem from './MultipleChoiceItem';
import MultipleChoiceFormItem from './MultipleChoiceFormItem';
import ProductAddToCartButton from '../../ProductAddToCartButton';
import {
  addGoods,
} from 'r/actions/GoodStateActions';

import { isEmpty, values, map } from 'lodash';

class ProductCartMultipleChoice extends Component {
  static propTypes = {
    goods: PropTypes.array.isRequired,
    productGlobalId: PropTypes.string.isRequired
  };
  static defaultProps = {
    goods: []
  }
  constructor(props) {
    super(props);

    this.state = {selectedGoods: {}}
  }

  handleCartButton = () => {
    // spinner
    addGoods(this.props.productGlobalId, values(this.state.selectedGoods));
    this.setState( { selectedGoods: {} });
  }

  onChangeAmount = (good, count) => {
    this.onAdd(good, count);
  }

  onRemove = (good) => {
    delete this.state.selectedGoods[good.globalId];
    this.setState({ selectedGoods: this.state.selectedGoods });
  }

  onAdd = (good, count = 1) => {
    this.state.selectedGoods[good.globalId] = { globalId: good.globalId, count: count, good: good }
    this.setState({ selectedGoods: this.state.selectedGoods });
  }

  render() {
    const { goods, properties, t } = this.props;

    const { selectedGoods } = this.state;

    const formItems = map(
      selectedGoods,
      (item) =>
        <MultipleChoiceFormItem
          key={item.goodId}
          count={item.count}
          properties={properties}
          good={item.good}
          onRemove={this.onRemove}
          onChangeAmount={this.onChangeAmount}
          />
    )

    const empty = isEmpty(selectedGoods)
    return (
      <div>
        <div className="row b-item-full__multiple-choice">
          <div className="col-md-8 col-xs-12 b-item-full__multiple-choice__items">
            {goods.map((good, idx) => <MultipleChoiceItem properties={properties} selected={!!selectedGoods[good.globalId]} onClick={this.onAdd} good={good} />)}
          </div>
          <div className="col-md-4 col-xs-12 b-item-full__multiple-choice__form">
            {empty &&
              <div className="row">
                <div className="col-md-12">
                  <h3>{t('vendor.cart.not_selected_products')}</h3>
                </div>
              </div>
            }
            {!empty &&
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h3>{t('vendor.cart.selected_products')}</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 b-item-full__multiple-choice__form__table">
                  {formItems}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 b-item-full__form__row b-item-full__form__submit">
                    <ProductAddToCartButton
                      t={t}
                      text={t('vendor.button.to_cart')}
                      onClick={this.handleCartButton}
                    />
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCartMultipleChoice;
