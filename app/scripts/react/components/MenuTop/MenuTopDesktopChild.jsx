import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as schemas from 'r/schemas';
import classNames from 'classnames';
import { categoryRoute } from 'scripts/routes/app';
import { createBrowserHistory } from 'history';

class MenuTopDesktopChild extends Component {
  constructor(props) {
    super(props);
    this.handleClickLink = this.handleClickLink.bind(this);
  }
  componentDidMount() {
    this.history = createBrowserHistory();
  }
  handleClickLink(ev) {
    const {
      child,
    } = this.props;
    const {
      isWidget,
    } = this.context;

    ev.preventDefault();
    if (child && child.url) {
      if (isWidget) {
        this.history.push(categoryRoute(child.id));
      } else {
        window.location.href = child.url;
      }
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

MenuTopDesktopChild.contextTypes = {
  isWidget: PropTypes.bool,
};

export default MenuTopDesktopChild;
