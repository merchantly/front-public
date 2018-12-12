import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import CabinetContainer from './index';
import CabinetOrder from './CabinetOrder';
import ClientForm from './ClientForm';
import CompanyForm from './CompanyForm';
import Pagination from 'rc/Pagination';
import * as schemas from 'r/schemas';

class CabinetPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      client,
      orders,
      clientForm,
      companyForm,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <CabinetContainer {...{
          client,
          orders,
          clientForm,
          companyForm,
          i18n,
        }} />
      </VendorLayoutContainer>
    );
  }
}

CabinetPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  client: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phones: PropTypes.arrayOf(PropTypes.object).isOptional,
    emails: PropTypes.arrayOf(PropTypes.object).isOptional,
    logoutUrl: PropTypes.string.isRequired,
    resetPasswordUrl: PropTypes.string.isRequired,
  }).isRequired,
  orders: PropTypes.shape({
    currentPage: Pagination.propTypes.currentPage,
    totalPages: Pagination.propTypes.totalPages,
    items: PropTypes.arrayOf(PropTypes.shape(...CabinetOrder.propTypes)).isOptional,
  }),
  clientForm: PropTypes.shape(...ClientForm.propTypes).isRequired,
  companyForm: PropTypes.shape(...CompanyForm.propTypes).isRequired
};

export default CabinetPage;
