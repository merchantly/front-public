import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CatalogFilterContainer from 'rc/CatalogFilter';
import jQuery from 'jquery';

const MIN_DESKTOP_WIDTH = 1024;

class ItemListCatalog extends Component {
  constructor(props) {
    super(props);

    this.handleFilterToggle = this.handleFilterToggle.bind(this);

    // Сразу закрытым делать нельзя, потому что тогда не правильно
    // отрисовываются размеры изображение в галерее.
    // Они задаются больше и тогда изображения сдвигаются за контейнер.
    this.state = {
      isOpen: true // По-умолчанию должен показываться
    };
  }

  componentDidMount() {
    // В мобильнов варианте автоматически закрываем
    this.setState({ isOpen: (jQuery(document).width() >= MIN_DESKTOP_WIDTH) });
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
