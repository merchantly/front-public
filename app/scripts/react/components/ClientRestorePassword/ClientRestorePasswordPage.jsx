import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import ClientRestorePassword from './ClientRestorePassword';
import * as schemas from 'r/schemas';

class ClientRestorePasswordPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      vendorClientRestorePasswordPath,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <ClientRestorePassword {...{
          i18n,
          vendorClientRestorePasswordPath,
        }}
        />
      </VendorLayoutContainer>
    );
  }
}

ClientRestorePasswordPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  vendorClientRestorePasswordPath: PropTypes.string.isRequired,
};

export default ClientRestorePasswordPage;