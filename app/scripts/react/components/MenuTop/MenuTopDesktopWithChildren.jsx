import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import * as schemas from 'r/schemas';
import MenuTopDesktopChild from './MenuTopDesktopChild';
import AppLink from 'rc/common/AppLink';
import { categoryRoute } from 'scripts/routes/app';

class MenuTopDeskTopWithChildren extends Component {
  renderChildrenSingleColumn(id, children) {
    return (
      <li className="b-nav__list__col" id={`menu_item_li_${id}_children_group`}>
        <ul className="b-nav__list">
          {children.map((child) => (
            <MenuTopDesktopChild
              checkIfActive={this.props.checkIfActive}
              child={child}
              key={`child-${child.id}`}
            />
          ))}
        </ul>
      </li>
    );
  }
  renderChildrenTwoColumns(id, children) {
    const median = Math.ceil(children.length / 2);
    const groups = [
      children.slice(0, median),
      children.slice(median),
    ];

    return groups.map((g, idx) => (
      <li
        className="b-nav__list__col"
        id={`menu_item_li_${id}_children_group_${idx}`}
        key={`menu-children-group-${idx}`}
      >
        <ul className="b-nav__list">
          {g.map((child) => (
            <MenuTopDesktopChild
              checkIfActive={this.props.checkIfActive}
              child={child}
              key={`child-${child.id}`}
            />
          ))}
        </ul>
      </li>
    ));
  }
  render() {
    const {
      checkIfActive,
      isLast,
      item,
    } = this.props;
    const {
      id,
      children,
      title,
      url,
    } = item;
    const liClasses = classNames({
      'b-nav__item': true,
      'b-nav__item_has-sub': true,
      'b-nav__item_has-sub_reverse': isLast,
      'b-nav__item__active': checkIfActive(item),
    });

    return (
      <li
        className={liClasses}
        id={`menu_item_li_${id}`}
        key={`menu-item-with-children-${id}`}
      >
        <AppLink
          className="b-nav__link"
          hash={categoryRoute(id)}
          href={url}
        >
          {title}
        </AppLink>
        <ul className="b-nav__list b-nav__list_sub">
          {children.length < 6 ?
            this.renderChildrenSingleColumn(id, children) :
            this.renderChildrenTwoColumns(id, children)
          }
        </ul>
      </li>
    );
  }
}

MenuTopDeskTopWithChildren.propTypes = {
  checkIfActive: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
  item: schemas.menuItem.isRequired,
};

export default MenuTopDeskTopWithChildren;
