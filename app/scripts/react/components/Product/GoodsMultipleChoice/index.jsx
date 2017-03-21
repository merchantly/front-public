import React, { Component, PropTypes } from 'react';
import MultipleChoiceItem from './MultipleChoiceItem';
import MultipleChoiceFormItem from './MultipleChoiceFormItem';
import ProductAddToCartButton from '../ProductAddToCartButton';
import {SortableContainer, arrayMove} from 'react-sortable-hoc';

const SortableList = SortableContainer(({items, properties, onSelect}) => {
  return (
    <div className="col-md-12 b-item-full__multiple-choice__form__table">
      {items.map((good, idx) => <MultipleChoiceFormItem key={`item-${idx}`} idx={idx} onRemove={onSelect} properties={properties} good={good} />)}
    </div>
  );
});

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

  onSortEnd = ({oldIndex, newIndex}) => {
    let {selectedGoods} = this.state;

    this.setState({
      selectedGoods: arrayMove(selectedGoods, oldIndex, newIndex)
    });
  };

  render() {
    const { goods, properties, t } = this.props;

    const { selectedGoods } = this.state;

    return (
      <div>
        <div className="row b-item-full__multiple-choice">
          <div className="col-md-8 col-xs-12 b-item-full__multiple-choice__items">
            {goods.map((good, idx) => <MultipleChoiceItem properties={properties} selected={selectedGoods.includes(good)} onClick={this.onSelect} good={good} />)}
          </div>
          <div className="col-md-4 col-xs-12 b-item-full__multiple-choice__form">
            {selectedGoods.length === 0 &&
              <div className="row">
                <div className="col-md-12">
                  <h3>{t('vendor.cart.not_selected_products')}</h3>
                </div>
              </div>
            }
            {selectedGoods.length > 0 &&
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h3>{t('vendor.cart.selected_products')}</h3>
                  </div>
                </div>
                <div className="row">
                  <SortableList onSortEnd={this.onSortEnd} useDragHandle={true} items={selectedGoods} properties={properties} onSelect={this.onSelect} />
                </div>
                <div className="row">
                  <div className="col-md-12 b-item-full__form__row b-item-full__form__submit">
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
