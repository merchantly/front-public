import React, { Component, PropTypes } from 'react';
import MultipleChoiceItem from './MultipleChoiceItem';
import MultipleChoiceFormItem from './MultipleChoiceFormItem';
import ProductAddToCartButton from '../ProductAddToCartButton';

class GoodsMultipleChoice extends Component {
  static propTypes = {
    goods: PropTypes.array.isRequired
  };
  static defaultProps = {
    goods: []
  }
  constructor(props) {
    super(props);

    this.state = {selectedGoods: []};
  }

  onSelect = (good) => {
    if (this.state.selectedGoods.includes(good)){
      const newState = this.state.selectedGoods.filter((item) => {
        return item !== good;
      });
      this.setState({
        selectedGoods: newState
      })
    } else {
      this.setState((state) => ({ selectedGoods: state.selectedGoods.concat(good) }))
    }
  }

  render() {
    const { goods, properties, t } = this.props;

    const { selectedGoods } = this.state;

    return (
      <div>
        <div className="row b-item-full__multiple-choice">
          <div className="col-md-8 b-item-full__multiple-choice__items">
            {goods.map((good, idx) => <MultipleChoiceItem properties={properties} selected={selectedGoods.includes(good)} onClick={this.onSelect} good={good} />)}
          </div>
          <div className="col-md-4 b-item-full__multiple-choice__form">
            {selectedGoods.length === 0 &&
              <div className="row">
                <h3>{t('vendor.cart.not_selected_products')}</h3>
              </div>
            }
            {selectedGoods.length > 0 &&
              <div>
                <div className="row">
                  <h3>{t('vendor.cart.selected_products')}</h3>
                </div>
                <div>
                  {selectedGoods.map((good, idx) => <MultipleChoiceFormItem onRemove={this.onSelect} properties={properties} good={good} />)}
                </div>
                <div className="row">
                  <div className="b-item-full__form__row b-item-full__form__submit">
                    {selectedGoods.length > 0 && <ProductAddToCartButton
                      t={t}
                      text={t('vendor.button.to_cart')}
                    />}
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

export default GoodsMultipleChoice;
