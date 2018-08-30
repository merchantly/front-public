import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { COLLAPSED_VISIBLE_COUNT, MAX_VISIBLE_LIMIT } from './CatalogFilterCheckbox.constants';
import { getFilter } from './utils';
import { showFilteredCount } from '../../actions/catalogFilterActions';
import CatalogFilterExpandButton from './CatalogFilterExpandButton';

class CatalogFilterCheckbox extends Component {
  state = {
    expanded: !this.isHugeList(),
  }
  isHugeList() {
    return this.props.items.length > MAX_VISIBLE_LIMIT;
  }
  isOptionVisible(option, index) {
    if (this.isHugeList()) {
      return option.checked || index + 1 <= COLLAPSED_VISIBLE_COUNT;
    }
    return true;
  }
  getFieldName(item) {
    if (this.props.filterName != null) {
      return `${this.props.filterName}[${this.props.paramName}][${item.paramValue}]`;
    } else {
      return `${this.props.paramName}[${item.paramValue}]`;
    }
  }
  expandList() {
    this.setState({ expanded: true });
  }
  turnList() {
    this.setState({ expanded: false });
  }
  handleChange() {
    showFilteredCount(getFilter(this, this.props.params), this.props.t);
  }
  renderOptions() {
    const checked = [];
    const unchecked = [];

    this.props.items.forEach((item) => {
      item.checked ? checked.push(item) : unchecked.push(item)
    });

    const items = checked.concat(unchecked);

    return (
      <div className="b-full-filter__widget">
        {
          items.map((item, i) => {
            const optionClasses = classNames({
              'b-cbox': true,
              'b-cbox--full': !this.isOptionVisible(item, i),
            });

            return (
              <label className={optionClasses} key={i}>
                <input
                  className="b-cbox__native"
                  defaultChecked={item.checked}
                  name={this.getFieldName(item)}
                  onChange={this.handleChange.bind(this)}
                  type="checkbox"
                />
                <div className="b-cbox__val">
                  {item.name}
                </div>
              </label>
            );
          })
        }
      </div>
    );
  }
  renderFilterExpandButton() {
    const { expanded } = this.state;
    const { t } = this.props;

    if (this.isHugeList()) {
      return (
        <CatalogFilterExpandButton
          expanded={expanded}
          t={t}
          onExpand={this.expandList.bind(this)}
          onTurn={this.turnList.bind(this)}
        />
      );
    }

    return null;
  }
  render() {
    const { title } = this.props;
    const { expanded } = this.state;
    const itemClasses = classNames({
      'b-full-filter__item': true,
      'b-full-filter__item--full': expanded,
      'b-full-filter__item--short': !expanded,
      'b-full-filter__item--huge': this.isHugeList()
    });

    return (
      <li className={itemClasses}>
        <div className="b-full-filter__item__title">
          {title}
        </div>
        {this.renderOptions()}
        {this.renderFilterExpandButton()}
      </li>
    );
  }
}

CatalogFilterCheckbox.propTypes = {
  filterName: PropTypes.string,
  items: PropTypes.array.isRequired,
  paramName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CatalogFilterCheckbox;
