import React, { Component } from 'react'; import PropTypes from 'prop-types';
import { getOptions } from 'r/components/Product/ProductProperties/utils';
import MultipleChoiceItem from './MultipleChoiceItem';
import AssetImage from 'r/components/common/AssetImage';
import InputNumberSpinner from 'r/components/common/InputNumberSpinner';
import { partial } from 'lodash';
import {
  SortableHandle,
} from 'react-sortable-hoc';

const DragHandle = SortableHandle(({good, properties}) =>
  <div className="b-item-full__multiple-choice__form__row__items">
    <MultipleChoiceItem properties={properties} good={good} />
  </div>
);

export default class MultipleChoiceFormItem extends Component {
  static propTypes = {
    good: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
    onChangeAmount: PropTypes.func.isRequired,
    properties: PropTypes.array.isRequired,
  };

  onChangeAmount = (count) => {
    const { good } = this.props;
    this.props.onChangeAmount(good, count);
  }

  onRemove = () => {
    const { good } = this.props;
    this.props.onRemove(good);
  }

  render() {
    const { properties, good, count } = this.props;

    return (
        <div className="b-item-full__multiple-choice__form__row no-select__for-childs">
          <DragHandle properties={properties} good={good} />
          <div className="b-item-full__multiple-choice__form__row__count">
            <InputNumberSpinner
              name={`cart_items[${good.globalId}][count]`}
              min={1}
              max={gon.max_items_count}
              onChange={this.onChangeAmount}
              step={1}
              value={count}
            />
          </div>
          <div className="b-item-full__multiple-choice__form__row__actions">
            <a className="b-cart__item__remove" onClick={this.onRemove}><AssetImage src="images/cross_white.svg" /></a>
          </div>
        </div>
    );
  }
}
