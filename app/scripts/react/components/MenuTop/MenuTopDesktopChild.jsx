import React, { Component, PropTypes } from 'react';
import * as schemas from 'r/schemas';
import classNames from 'classnames';

class MenuTopDesktopChild extends Component {
  constructor(props) {
    super(props);

    this.handleClickLink = this.handleClickLink.bind(this);
  }
  handleClickLink(ev) {
    const {
      child,
    } = this.props;

    ev.preventDefault();
    if (child && child.url) {
      window.location.href = child.url;
    }
  }
  render() {
    const {
      checkIfActive,
      child,
    } = this.props;

    if (!child) {
      return null;
    }

    const {
      id,
      productsCount,
      title,
    } = child;
    const childClasses = classNames({
      'b-nav__item': true,
      'b-nav__item__active': checkIfActive(child),
    });

    return (
      <li
        className={childClasses}
        id={`menu_item_${id}`}
        key={`menu-child-${id}`}
      >
        <a
          className="b-nav__link"
          data-count={productsCount}
          href="#"
          onClick={this.handleClickLink}
        >
          {title}
        </a>
      </li>
    );
  }
}

MenuTopDesktopChild.propTypes = {
  checkIfActive: PropTypes.func.isRequired,
  child: schemas.menuItem.isRequired,
};

export default MenuTopDesktopChild;
