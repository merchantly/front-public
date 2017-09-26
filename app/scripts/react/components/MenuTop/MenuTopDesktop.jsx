import React, { Component, PropTypes } from 'react';
import * as schemas from 'r/schemas';
import MenuTopDesktopSingle from './MenuTopDesktopSingle';
import MenuTopDesktopWithChildren from './MenuTopDesktopWithChildren';

class MenuTopDesktop extends Component {
  constructor(props) {
    super(props);

    this.isActive = this.isActive.bind(this);
  }
  isActive(item) {
    const {
      activeItems,
    } = this.props;

    return !!activeItems.filter((activeItem) => (
      activeItem.id === item.id && activeItem.type === item.type
    )).length;
  }
  render() {
    const {
        items,
    } = this.props;

    if (!items.length) {
      return null;
    }

    return (
      <nav className="b-nav">
        <ul className="b-nav__list">
          {items.map((item, idx) => (item.children && item.children.length)
            ? (
              <MenuTopDesktopWithChildren
                checkIfActive={this.isActive}
                isRight={idx === items.length - 1}
                item={item}
                key={`menu-top-${idx}`}
              />
            )
            : (
              <MenuTopDesktopSingle
                checkIfActive={this.isActive}
                item={item}
                key={`menu-top-${idx}`}
              />
            )
          )}
        </ul>
      </nav>
    );
  }
}

MenuTopDesktop.propTypes = {
  activeItems: PropTypes.arrayOf(schemas.menuItem).isRequired,
  items: PropTypes.arrayOf(schemas.menuItem).isRequired,
};

export default MenuTopDesktop;
