import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import CatalogFilterContainer from 'rc/CatalogFilter';

const MIN_DESKTOP_WIDTH = 1024;

class ItemListCatalog extends Component {
  constructor(props) {
    super(props);

    this.handleFilterToggle = this.handleFilterToggle.bind(this);

    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    // В мобильнов варианте автоматически закрываем
    // Сразу закрытым делать нельзя, потому что тогда не правильно
    // отрисовываются размеры изображение в галерее.
    // Они задаются больше и тогда изображения сдвигаются за контейнер.
    this.setState({ isOpen: ($(document).width() >= MIN_DESKTOP_WIDTH) });
  }

  handleFilterToggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const {
      children,
      catalogFilterProps,
      showCatalogFilter,
      t,
    } = this.props;
    const {
      isOpen,
    } = this.state;
    const itemListClasses = classNames({
      'b-item-list': true,
      'b-item-list_catalog': true,
      'b-item-list--with-filter': showCatalogFilter,
      'b-item-list--with-hidden-filter': showCatalogFilter && !isOpen,
    });

    return (
      <section className={itemListClasses}>
        {showCatalogFilter && (
          <CatalogFilterContainer
            {...catalogFilterProps}
            handleFilterToggle={this.handleFilterToggle}
            isOpen={isOpen}
            t={t}
          />
        )}
        {children}
      </section>
    );
  }
}

ItemListCatalog.propTypes = {
  isOpenByDefault: PropTypes.bool,
  catalogFilterProps: PropTypes.shape({ ...CatalogFilterContainer.propTypes }),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  showCatalogFilter: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

ItemListCatalog.defaultProps = {
  isOpenByDefault: true,
  showCatalogFilter: false
};

export default ItemListCatalog;
