import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as schemas from 'r/schemas';
import NavBarContacts from './NavBarContacts';
import ProductSearchForm from 'rc/common/ProductSearchForm';
import Logo from 'rc/Logo';
import { Clientbar } from 'rc/Clientbar';

class NavBar extends Component {
  render() {
    const {
      clientBarProps,
      logoProps,
      vendor,
      searchQuery,
      showClientBar,
      t,
    } = this.props;

    return (
      <header className="b-header">
        <div className="b-header__container">
          <div className="b-header__content">
            <div className="b-header__desc">
              <NavBarContacts
                vendorContacts={vendor.contacts}
                vendorTitle={vendor.title}
              />
            </div>
            <div className="b-header__logo">
              <Logo {...logoProps} />
            </div>
            <div className="b-header__search">
              <ProductSearchForm
                searchProductsPath={vendor.searchProductsPath}
                searchQuery={searchQuery}
                t={t}
              />
            </div>
            {showClientBar && <Clientbar {...clientBarProps} t={t} />}
          </div>
        </div>
      </header>
    );
  }
}

NavBar.propTypes = {
  clientBarProps: PropTypes.shape(Clientbar.propTypes).isRequired,
  logoProps: PropTypes.shape(Logo.propTypes).isRequired,
  searchQuery: PropTypes.string,
  showClientBar: PropTypes.bool,
  vendor: schemas.vendor.isRequired,
  t: PropTypes.func,
};

export default NavBar;
