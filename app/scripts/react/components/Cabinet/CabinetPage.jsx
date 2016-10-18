import React, { Component, PropTypes } from 'react';
import VendorLayoutContainer from 'rc/VendorLayout';
import CabinetContainer from './index';
import CabinetOrder from './CabinetOrder';
import Pagination from 'rc/Pagination';

class CabinetPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      client,
      orders,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <CabinetContainer {...{
          client,
          orders,
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
    phones: PropTypes.arrayOf(PropTypes.string).isOptional,
    emails: PropTypes.arrayOf(PropTypes.string).isOptional,
    logoutUrl: PropTypes.string.isRequired,
  }).isRequired,
  orders: PropTypes.shape({
    currentPage: Pagination.propTypes.currentPage,
    totalPages: Pagination.propTypes.totalPages,
    items: PropTypes.arrayOf(PropTypes.shape(...CabinetOrder.propTypes)).isOptional,
  }),
};

export default CabinetPage;
