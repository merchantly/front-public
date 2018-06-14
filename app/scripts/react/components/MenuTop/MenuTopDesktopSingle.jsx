import React, { Component } from 'react'; import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as schemas from 'r/schemas';
import AppLink from 'rc/common/AppLink';
import { categoryRoute } from 'scripts/routes/app';

class MenuTopDesktopSingle extends Component {
  render() {
    const {
      checkIfActive,
      item,
    } = this.props;
    const {
      id,
      title,
      url,
    } = item;
    const liClasses = classNames({
      'b-nav__item': true,
      'b-nav__item__active': checkIfActive(item),
    });

    return (
      <li
        className={liClasses}
        id={`menu_item_li_${id}`}
        key={`menu-item-single-${id}`}
      >
        <AppLink
          className="b-nav__link"
          hash={categoryRoute(id)}
          href={url}
        >
          {title}
        </AppLink>
      </li>
    );
  }
}

MenuTopDesktopSingle.propTypes = {
  checkIfActive: PropTypes.func.isRequired,
  item: schemas.menuItem.isRequired,
};

export default MenuTopDesktopSingle;
