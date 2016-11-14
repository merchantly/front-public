import React, { Component, PropTypes } from 'react';
import * as schemas from 'r/schemas';
import MenuTopToggleButton from './MenuTopToggleButton';
import $ from 'jquery';

class MenuTopMobile extends Component {
  constructor(props) {
    super(props);

    this.state = { isActive: false };
  }
  componentDidMount () {
    this.$node = $(this.refs.container);

    if (!this.$node.length) {
      return;
    }

    this.$node.mmenu({
      classes: false,
      counters: false,
    });

    this.$node.on('opened.mm', () => this.setState({ isActive: true }));
    this.$node.on('closed.mm', () => this.setState({ isActive: false }));
  }
  componentWillUnmount () {
    if (!this.$node) {
      return;
    }

    this.$node.off();
  }
  renderSingle(item) {
    const {
      id,
      title,
      url,
    } = item;

    return (
      <li id={`mob_menu_item_li_${id}`} key={`mob-menu-item-${id}`}>
        <a href={url}>
          {title}
        </a>
      </li>
    );
  }
  renderWithChildren(item) {
    const {
      id,
      title,
      children,
    } = item;

    return (
      <li id={`mob_menu_item_li_${id}`} key={`mob-menu-item-${id}`}>
        <span>
          {title}
        </span>
        <ul>
          {children.map((child) => (
            <li id={`mob_menu_item_li_${child.id}`} key={`mob-menu-item-${child.id}`}>
              <a
                data-count={child.productsCount}
                href={child.url}
              >
                {child.title}
              </a>
            </li>
          ))}
        </ul>
      </li>
    );
  }
  render() {
    const {
      hasClientCabinet,
      items,
      t,
      vendorCabinetPath,
    } = this.props;
    const {
      isActive,
    } = this.state;

    return (
      <div>
        <MenuTopToggleButton isActive={isActive} />
        <div id="nav" ref="container">
          <ul>
            <li className="b-search">
              <form action="/products/search">
                <input
                  className="b-search__field"
                  name="query"
                  placeholder={t('vendor.placeholders.search')}
                  type="text"
                />
                <button className="b-search__submit" type="submit" />
              </form>
            </li>
            {hasClientCabinet && (
              <li id="mob_menu_item_li_cabinet">
                <a href={vendorCabinetPath}>
                  {t('vendor.client.cabinet.title')}
                </a>
              </li>
            )}
            {items.length > 0 && items.map((item) => (
              item.children.length > 0 ?
                this.renderWithChildren(item) :
                this.renderSingle(item)
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

MenuTopMobile.propTypes = {
  hasClientCabinet: PropTypes.bool,
  items: PropTypes.arrayOf(schemas.menuItem).isRequired,
  t: PropTypes.func.isRequired,
  vendorCabinetPath: PropTypes.string,
};

export default MenuTopMobile;
