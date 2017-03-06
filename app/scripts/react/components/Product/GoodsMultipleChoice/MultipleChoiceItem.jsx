import React, { Component, PropTypes } from 'react';
import { getOptions } from '../ProductProperties/utils';
import tinycolor from 'tinycolor2';

export default class MultipleChoiceItem extends Component {
  static propTypes = {
    good: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func
  };
  constructor(props) {
    super(props);
  }

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.good);
    }
  }

  renderTitleContainer = () => {
    const { properties, good, selected } = this.props;
    let titleBuffer = [];

    let indStyles;

    for (const [attrId, attrValue] of Object.entries(good.attributes)) {
      const prop = properties.find(p => p.id === parseInt(attrId));

      if (prop) {
        const value = prop.items.find(item => item.value === attrValue);
        if (value) {
          titleBuffer.push(`${prop.title} - ${value.title}`);

          if (value.imageUrl) {
            indStyles = { backgroundImage: `url("${value.imageUrl}")` };
          } else {
            indStyles = { backgroundColor: value.color };
          }
          indStyles.color = tinycolor(value.color).isLight() ? 'black' : 'white';
        }
      }
    }

    if (titleBuffer.length === 0) {
      titleBuffer.push(good.title);
    }
    const title = titleBuffer.join(', ');

    return (
      <div style={indStyles} className="b-item-full__multiple-choice__item" onClick={this.onClick}>
        {selected && `\u2714 ${title}`}
        {!selected && title}
      </div>
    )
  }

  render() {
    return this.renderTitleContainer();
  }
}
