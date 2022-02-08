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
      phoneValue,
      clientRegistrationButtonText,
      clientResetPasswordPath,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <ClientSessionNewContainer {...{
          formAuthenticity,
          i18n,
          timeout,
          vendorClientSessionsPath,
          vendorClientRegistrationPath,
          phoneValue,
          clientRegistrationButtonText,
          clientResetPasswordPath,
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
  phoneValue: PropTypes.string,
  clientRegistrationButtonText: PropTypes.string,
  clientResetPasswordPath: PropTypes.string.isRequired,
};

ClientSessionNewPage.defaultProps = {
  phoneValue: ''
};

export default ClientSessionNewPage;
