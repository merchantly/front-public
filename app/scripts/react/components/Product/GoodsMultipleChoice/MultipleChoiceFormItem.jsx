import React, { Component, PropTypes } from 'react';
import { getOptions } from '../ProductProperties/utils';
import MultipleChoiceItem from './MultipleChoiceItem';
import Select from 'r/components/common/Select';
import AssetImage from 'r/components/common/AssetImage';

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
    const { properties, good, onRemove } = this.props;

    const maxAvail = good.quantity ? good.quantity : gon.max_items_count;

    const options = Array(maxAvail).fill().map((_, i) => ({
      value: i + 1,
      title: i + 1,
      disabled: false,
    }));

    const { count } = this.state;

    return (
      <div className="row">
        <div className="col-md-8">
          <MultipleChoiceItem properties={properties} good={good} />
        </div>
        <div className="col-md-2">
          <Select
            name={`cart_items[${good.globalId}][count]`}
            onChange={this.onChange}
            options={options}
            value={count}
          />
        </div>
        <div className="col-md-2">
          <a className="b-cart__item__remove" onClick={this.onRemove}><AssetImage src="images/cross_white.svg" /></a>
        </div>
      </div>
    );
  }
}
