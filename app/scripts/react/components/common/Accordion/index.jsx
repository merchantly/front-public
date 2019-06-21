import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { getTransitionEndEvent } from 'r/helpers/dom';

export default class Accordion extends Component {
  static propTypes = {
    allowMultiple: PropTypes.bool,
    defaultSelectedKey: PropTypes.string,
    selectedIndex: PropTypes.number,
    selectedKey: PropTypes.string,
    onItemClick: PropTypes.func,
    updateEvent: PropTypes.string,
  }
  defaultProps = {
    allowMultiple: false,
  }
  constructor(props) {
    super(props);

    let selectedIndex = props.selectedIndex || 0;

    if (props.selectedKey) {
      const childKeys = props.children.map((el) => el.props.itemKey);
      const childIndex = childKeys.indexOf(props.selectedKey);
      const childDefaultIndex = childKeys.indexOf(props.defaultSelectedKey);

      if (childIndex > -1) {
        selectedIndex = childIndex;
      } else if (childDefaultIndex > -1) {
        selectedIndex = childDefaultIndex;
      }
    }

    const state = { selectedIndex };

    if (props.allowMultiple) {
      state.activeItems = [selectedIndex];
    }

    this.state = state;
  }
  componentDidMount() {
    const { updateEvent } = this.props;
    const transitionEndEvent = getTransitionEndEvent();

    this.allowOverflowByIndex(this.state.selectedIndex);
    // allow overflow for absolute positioned elements inside
    // the item body, but only after animation is complete
    $(findDOMNode(this)).on(transitionEndEvent, () => {
      if (this.state.selectedIndex > -1) {
        this.allowOverflowByIndex(this.state.selectedIndex);
      }
      if (updateEvent) {
        $(document).trigger(updateEvent);
      }
    });
  }
  allowOverflowByIndex(idx) {
    const item = this.refs[`item-${ idx }`];
    if (item) { item.allowOverflow(); }
  }
  handleClick(index, item) {
    const newState = { selectedIndex: index };

    if (this.props.allowMultiple) {
      newState.activeItems = [...this.state.activeItems];

      const position = newState.activeItems.indexOf(index);

      if (position > -1) {
        newState.activeItems.splice(position, 1);
        newState.selectedIndex = -1;
      } else {
        newState.activeItems.push(index);
      }
    } else if (index === this.state.selectedIndex) {
      newState.selectedIndex = -1;
    }

    if (this.props.onItemClick) {
      this.props.onItemClick(index, item.props);
    }

    this.setState(newState);
  }
  renderItems() {
    const { allowMultiple, children } = this.props;
    const { activeItems, selectedIndex } = this.state;

    if (!children) { return null; }

    return Children.map(children, (el, idx) => {
      const expanded = (
        selectedIndex === idx || (allowMultiple && activeItems.indexOf(idx) > -1)
      );

      return cloneElement(el, {
        expanded,
        key: idx,
        onClick: this.handleClick.bind(this, idx, el),
        ref: `item-${ idx }`
      })
    });
  }
  render() {
    return (
      <div className="react-sanfona" role="tablist">
        {this.renderItems()}
      </div>
    );
  }
}
