import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tinycolor from 'tinycolor2';
import * as designTypes from '../../constants/designTypes';
import { map } from 'lodash-es';

export default class DesignSettingsRadioList extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  }
  getItemProps(item) {
    const {
      name,
      type,
      value,
    } = this.props;
    const props = {
      name,
      checked: value === item.value,
      onChange: this.props.onChange.bind(this, item.value),
      key: `${name}-${item.value}`,
    };

    switch(type) {
      case designTypes.DESIGN_COLOR_TYPE:
        return {
          ...props,
          className: classNames('radiobtn--circle', {
            'radiobtn--light': tinycolor(item.value).isLight(),
          }),
          style: { backgroundColor: item.value },
        };
      case designTypes.DESIGN_FONT_TYPE:
        return {
          ...props,
          className: 'radiobtn--font radiobtn--font-' + item.value,
          text: 'Aa',
        };
      case designTypes.DESIGN_FONT_SIZE_TYPE:
        return {
          ...props,
          className: 'radiobtn--font radiobtn--fontsize-' + item.value,
          text: 'Aa',
        };
      case designTypes.DESIGN_RADIO_TYPE:
        return {
          ...props,
          className: 'radiobtn--default',
          text: item.title,
        };
      default:
        return {
          ...props,
          className: 'radiobtn--circle',
          text: item.value,
        };
    }
  }
  renderItem(item) {
    return <DesignSettingsRadioListItem {...this.getItemProps(item)} />;
  }
  render() {
    return (
      <span>
        {map(this.props.items, this.renderItem.bind(this))}
      </span>
    );
  }
}

class DesignSettingsRadioListItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    checked: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }
  render() {
    return (
      <label className={classNames('radiobtn', this.props.className)}>
        <input
          checked={this.props.checked}
          className="radiobtn__input"
          name={this.props.name}
          onChange={this.props.onChange}
          type="radio"
        />
        <span
          className="radiobtn__ind"
          style={this.props.style}
        >
          {this.props.text}
        </span>
      </label>
    );
  }
}
