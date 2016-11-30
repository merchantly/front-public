import React, { Component, PropTypes } from 'react';

class CatalogFilterToggle extends Component {
  render() {
    const {
      handleFilterToggle,
      isOpen,
    } = this.props;

    return (
      <div className="b-full-filter__trigger" onClick={handleFilterToggle}>
        <span className="b-btn element--active-opacity b-full-filter__trigger__action">
          {isOpen ? 'Скрыть фильтр' : 'Показать фильтр'}
        </span>
      </div>
    );
  }
}

CatalogFilterToggle.propTypes = {
  handleFilterToggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool,
};

export default CatalogFilterToggle;
