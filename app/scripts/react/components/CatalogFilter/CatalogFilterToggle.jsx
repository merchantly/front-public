import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CatalogFilterToggle extends Component {
  render() {
    const {
      handleFilterToggle,
      isOpen,
      t,
    } = this.props;

    return (
      <div className="b-full-filter__trigger" onClick={handleFilterToggle}>
        <span className="b-btn element--active-opacity b-full-filter__trigger__action">
          {t(`vendor.filter.${isOpen ? 'hide' : 'show'}`)}
        </span>
      </div>
    );
  }
}

CatalogFilterToggle.propTypes = {
  handleFilterToggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default CatalogFilterToggle;
