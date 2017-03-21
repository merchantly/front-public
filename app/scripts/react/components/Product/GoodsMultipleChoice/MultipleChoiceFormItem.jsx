import React, { Component, PropTypes } from 'react';
import { getOptions } from '../ProductProperties/utils';
import MultipleChoiceItem from './MultipleChoiceItem';
import AssetImage from 'r/components/common/AssetImage';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import InputNumberSpinner from '../../common/InputNumberSpinner';

const DragHandle = SortableHandle(({good, properties}) =>
  <div className="b-item-full__multiple-choice__form__row__items">
    <MultipleChoiceItem properties={properties} good={good} />
  </div>
);

const SortableItem = SortableElement(({good, properties, onChange, options, count, onRemove}) =>
  <div className="b-item-full__multiple-choice__form__row">
    <DragHandle properties={properties} good={good} />
    <div className="b-item-full__multiple-choice__form__row__count">
      <InputNumberSpinner
        name={`cart_items[${good.globalId}][count]`}
        min={1}
        onChange={onChange}
        step={1}
        value={count}
      />
    </div>
    <div className="b-item-full__multiple-choice__form__row__actions">
      <a className="b-cart__item__remove" onClick={onRemove}><AssetImage src="images/cross_white.svg" /></a>
    </div>
  </div>
);

export default class MultipleChoiceFormItem extends Component {
  static propTypes = {
    good: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func
  };
  constructor(props) {
    super(props);

    this.state = {count: 1};
  }

  onRemove = () => {
    const { good } = this.props;
    this.props.onRemove(good);
  }

  onChange = (count) => {
    this.setState({count});
  }

  render() {
    const { properties, good, idx } = this.props;

    const maxAvail = good.quantity ? good.quantity : gon.max_items_count;

    const options = Array(maxAvail).fill().map((_, i) => ({
      value: i + 1,
      title: i + 1,
      disabled: false,
    }));

    const { count } = this.state;

    return (
      <SortableItem key={`item-${idx}`} index={idx} good={good} onChange={this.onChange} onRemove={this.onRemove} properties={properties} options={options} count={count} />
    );
  }
}
