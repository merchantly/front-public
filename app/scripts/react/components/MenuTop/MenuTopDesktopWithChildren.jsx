import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as schemas from 'r/schemas';
import MenuTopDesktopChild from './MenuTopDesktopChild';
import AppLink from 'rc/common/AppLink';
import { categoryRoute } from 'scripts/routes/app';
import { findDOMNode } from 'react-dom';

const POSITION_CENTER = 'center';
const POSITION_RIGHT = 'right';
const SPLIT_LENGTH = 6; // Больше стольки пунктов разбиваются на 2 колонки

// 940 ширина контейнера меню
// 550 ширина двойного подпункта меню (в две колонки)

class MenuTopDeskTopWithChildren extends Component {
  constructor(props) {
    super(props);

    this.state = { position: undefined };
  }

  componentDidMount() {
    const $node = $(findDOMNode(this));
    const $children = $(findDOMNode(this.refs.children));
    const $parent = $node.offsetParent();

    const width = $children.width();
    const containerWidth = $parent.width();
    const left = $node.offset().left - $parent.offset().left;
    const right = left + $children.width();

    if (right > containerWidth) {
      if (left < width) {
        this.setState( { position: POSITION_CENTER } );
      } else {
        this.setState( { position: POSITION_RIGHT } );
      }
    }
  }

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
      position
    } = this.state;
    const {
      checkIfActive,
      isRight,
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
      'b-nav__item_has-sub_center': position === POSITION_CENTER,
      'b-nav__item_has-sub_reverse': isRight || position === POSITION_RIGHT,
      'b-nav__item__active': checkIfActive(item),
    });

    return (
      <li
        style={this.state.style}
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
        <ul ref="children" className="b-nav__list b-nav__list_sub">
          {children.length < SPLIT_LENGTH ?
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
  isRight: PropTypes.bool.isRequired,
  item: schemas.menuItem.isRequired,
};

export default MenuTopDeskTopWithChildren;
