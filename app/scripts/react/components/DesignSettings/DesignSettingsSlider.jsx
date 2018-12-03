import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import Slider from '../common/Slider';
import { Range } from 'rc-slider';

const MINIMUM_VALUE = 0,
      MAXIMUM_VALUE = 100,
      STEP = 1;

export default class DesignSettingsSlider extends Component {
  static propTypes = {
    displayValue: PropTypes.bool,
    from: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    step: PropTypes.number,
    to: PropTypes.number,
    value: PropTypes.number.isRequired, 
  }

  static defaultProps = {
    from: MINIMUM_VALUE,
    to: MAXIMUM_VALUE,
    step: STEP
  }

  handleSlide(range) {
    this.props.onChange(parseFloat(range[0]));
  }
  render() {
    const { displayValue, value } = this.props;
    const sliderClasses = classNames({
      'design-settings__slider--with-value': displayValue,
    });

    return (
      <span className={sliderClasses}>
        <Range
          min={this.props.from}
          max={this.props.to}
          defaultValue={[this.props.from, this.props.to]}
          onChange={this.handleSlide.bind(this)}
          // onSlide={this.handleSlide.bind(this)}
        />
        {displayValue &&
          <span className="design-settings__slider-value">
            {value}
          </span>
        }
      </span>
    );
  }
}
