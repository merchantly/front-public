import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import ClientSessionNewContainer from './index';
import * as schemas from 'r/schemas';

class ClientSessionNewPage extends Component {
  render() {
    const {
      formAuthenticity,
      i18n,
      layoutProps,
      timeout,
      vendorClientSessionsPath,
      vendorClientRegistrationPath,
      vendorClientRestorePasswordPath,
      phoneValue,
      clientRegistrationButtonText,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <ClientSessionNewContainer {...{
          formAuthenticity,
          i18n,
          timeout,
          vendorClientSessionsPath,
          vendorClientRegistrationPath,
          vendorClientRestorePasswordPath,
          phoneValue,
          clientRegistrationButtonText,
        }}
        />
      </VendorLayoutContainer>
    );
  }
}

ClientSessionNewPage.propTypes = {
  formAuthenticity: schemas.formAuthenticity.isRequired,
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  timeout: PropTypes.number,
  vendorClientSessionsPath: PropTypes.string.isRequired,
  vendorClientRegistrationPath: PropTypes.string.isRequired,
  vendorClientRestorePasswordPath: PropTypes.string.isRequired,
  phoneValue: PropTypes.string,
  clientRegistrationButtonText: PropTypes.string,
};

ClientSessionNewPage.defaultProps = {
  phoneValue: ''
};

export default ClientSessionNewPage;
