import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

class CatalogFilterColor extends Component {
  getFieldName(item) {
    if (this.props.filterName != null) {
      return `${this.props.filterName}[${this.props.paramName}][${item.paramValue}]`;
    } else {
      return item.paramValue;
    }
  }
  handleChange() {
    this.props.handleOptionChange(this);
  }
  render() {
    const { items, title } = this.props;

    return (
      <li className="b-full-filter__item">
        <div className="b-full-filter__item__title">
          {title}
        </div>
        <div className="b-full-filter__widget" ref="list">
          {
            items.map((item, i) => (
              <label className="b-cbox b-cbox_color" key={i}>
                <input
                  type="checkbox"
                  name={this.getFieldName(item)}
                  defaultChecked={item.checked}
                  title={item.name}
                  className="b-radio__native"
                  onChange={this.handleChange.bind(this)}
                />
                <div
                  className="b-cbox__val"
                  style={{ backgroundColor: item.hexCode }}
                />
              </label>
            ))
          }
        </div>
      </li>
    );
  }
}

CatalogFilterColor.propTypes = {
  filterName: PropTypes.string,
  items: PropTypes.array.isRequired,
  paramName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleOptionChange: PropTypes.func.isRequired,  
};

export default CatalogFilterColor;