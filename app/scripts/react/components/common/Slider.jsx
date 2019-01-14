import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

const MINIMUM_VALUE = 0,
      MAXIMUM_VALUE = 100,
      STEP = 1;

export default class CommonSlider extends Component {
  static propTypes = {
    from: PropTypes.number,
    to: PropTypes.number,
    value: PropTypes.number,
    step: PropTypes.number,
    reverse: PropTypes.bool,
    onSlide: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  }
  static defaultProps = {
    from: MINIMUM_VALUE,
    to: MAXIMUM_VALUE,
    step: STEP
  }

  render() {
    return (
      <Slider
        min={this.props.from}
        max={this.props.to}
        value={this.props.value}
        step={this.props.step}
        onChange={this.handleSlide.bind(this)}
        onAfterChange={this.handleChange.bind(this)}
      />
    );
  }

  handleSlide(value) {
    if (this.props.onSlide) {
      this.props.onSlide(value);
    }
  }
  handleChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
}
