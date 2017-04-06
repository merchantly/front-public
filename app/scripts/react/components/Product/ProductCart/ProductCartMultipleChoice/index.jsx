import React, { Component, PropTypes } from 'react';
import provideTranslations from 'r/components/HoC/provideTranslations';
import MultipleChoiceItem from './MultipleChoiceItem';
import MultipleChoiceFormItem from './MultipleChoiceFormItem';
import ProductAddToCartButton from '../../ProductAddToCartButton';
import {
  addGoods,
} from 'r/actions/GoodStateActions';
import connectToRedux from 'rc/HoC/connectToRedux';
import { connect } from 'react-redux';

import { isEmpty, values, map } from 'lodash';

class ProductCartMultipleChoice extends Component {
  static propTypes = {
    isAddingGood: PropTypes.bool.isRequired,
    goods: PropTypes.array.isRequired,
    productGlobalId: PropTypes.string.isRequired,
    addGoods: PropTypes.func.isRequired,
  }
  static defaultProps = {
    goods: [],
    isAddingGood: false,
  }
  constructor(props) {
    super(props);

    this.state = {selectedGoods: {}};
  }

  componentWillReceiveProps({ isAddingGood }) {
    if (isAddingGood) {
      this.setState({ isAddingGood: true });
    } else {
      // Процесс добавления окончен, можно удалять товары
      if (this.state.isAddingGood) {
        this.setState( { isAddingGood: false, selectedGoods: {} });
      }
    }
  }

  handleCartButton = () => {
    // spinner
    this.props.addGoods(this.props.productGlobalId, values(this.state.selectedGoods));
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
                      isAddingGood={this.props.isAddingGood}
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

export default provideTranslations(connectToRedux(connect(
  (state) => ({
    goodState: state.goodState,
  }),
  {
    addGoods,
  }
)(ProductCartMultipleChoice)));
