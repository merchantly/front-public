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
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement(({key, count, properties, good, onRemove, onChangeAmount}) => {
  return (
    <MultipleChoiceFormItem
      key={key}
      count={count}
      properties={properties}
      good={good}
      onRemove={onRemove}
      onChangeAmount={onChangeAmount}
      />
  );
});

const SortableList = SortableContainer(({items}) => {
  return (
    <div className="col-md-12 b-item-full__multiple-choice__form__table">
    {items.map((value, index) => (
      <SortableItem key={`item-${index}`} index={index} {...value} />
    ))}
    </div>
  );
});

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
    this.state = {selectedGoods: {}, items: []};
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

  componentWillReceiveProps({ isAddingGood }) {
    if (isAddingGood) {
      this.setState({ isAddingGood: true });
    } else {
      // Процесс добавления окончен, можно удалять товары
      if (this.state.isAddingGood) {
        this.setState( { justAdded: true, isAddingGood: false, selectedGoods: {} });
      }
    }
  }

  handleCartButton = () => {
    // spinner
    this.props.addGoods(this.props.productGlobalId, values(this.state.selectedGoods));
  }

  onChangeAmount = (good, count) => {
    this.onAdd(good, count, true);
  }

  changeAmmount = (globalId, count) => {
    let items = [...this.state.items];
    for (var i = 0; i < items.length; i ++) {
      if (items[i].key === globalId) {
        items[i].count = count;
      }
    }
    this.setState({ items: items });
  }

  deleteFromItems = (globalId) => {
    let items = [...this.state.items];
    for (var i = 0; i < items.length; i ++) {
      if (items[i].key === globalId) {
        items.splice(i, 1);
      }
    }
    this.setState({ items: items });
  }

  onRemove = (good) => {
    delete this.state.selectedGoods[good.globalId];
    this.setState({ justAdded: false, selectedGoods: this.state.selectedGoods });
    this.deleteFromItems(good.globalId);
  }

  onAdd = (good, count = 1, changing = false) => {
    this.state.selectedGoods[good.globalId] = { globalId: good.globalId, count: count, good: good }
    this.setState({ justAdded: false, selectedGoods: this.state.selectedGoods });

    if (changing) {
      this.changeAmmount(good.globalId, count)
    } else {
      let item = { key: good.globalId,
        count: count,
        properties: this.props.properties,
        good: good,
        onRemove: this.onRemove,
        onChangeAmount: this.onChangeAmount
      }
      this.setState((state) => ({ items: state.items.concat(item) }));
    }
  }

  render() {
    const { goods, properties, t } = this.props;
    const { selectedGoods, items } = this.state;
    const empty = isEmpty(selectedGoods)

    const emptyTitle = this.state.justAdded ? t('vendor.cart.just_added') : t('vendor.cart.not_selected_products');

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
                  <div className="u-title">{emptyTitle}</div>
                </div>
              </div>
            }
            {!empty &&
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <noindex><div className="u-title">{t('vendor.cart.selected_products')}</div></noindex>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 b-item-full__multiple-choice__form__table">
                  </div>
                </div>
                <div className="row">
                  <SortableList items={items} lockAxis="y" onSortEnd={this.onSortEnd} useDragHandle={true}/>
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
