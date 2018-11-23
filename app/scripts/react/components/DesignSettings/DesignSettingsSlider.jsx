import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import Slider from '../common/Slider';
import Slider, { Range } from 'rc-slider';

export default class DesignSettingsSlider extends Component {
  static propTypes = {
    displayValue: PropTypes.bool,
    from: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    step: PropTypes.number,
    to: PropTypes.number,
    value: PropTypes.number.isRequired,
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
        <Slider
          {...this.props}
          onChange={this.handleSlide.bind(this)}
          onSlide={this.handleSlide.bind(this)}
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
