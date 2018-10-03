import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import ClientResetPassword from './ClientResetPassword';
import * as schemas from 'r/schemas';

class ClientResetPasswordPage extends Component {
  render() {
    const {
      formAuthenticity,
      i18n,
      layoutProps,
      vendorClientResetPasswordPath,
      password,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <ClientResetPassword {...{
          formAuthenticity,
          i18n,
          vendorClientResetPasswordPath,
          password,
        }}
        />
      </VendorLayoutContainer>
    );
  }
}

ClientResetPasswordPage.propTypes = {
  formAuthenticity: schemas.formAuthenticity.isRequired,
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  vendorClientResetPasswordPath: PropTypes.string.isRequired,
  password: PropTypes.object,

};

ClientResetPasswordPage.defaultProps = {
  password: {
    value: '',
    errorMessage: ''
  }
};

export default ClientResetPasswordPage;