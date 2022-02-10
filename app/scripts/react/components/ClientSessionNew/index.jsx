import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClientSessionNew from './ClientSessionNew';
import provideTranslations from 'rc/HoC/provideTranslations';
import * as schemas from 'r/schemas';

class ClientSessionNewContainer extends Component {
  render() {
    return <ClientSessionNew {...this.props} />;
  }
}

ClientSessionNewContainer.propTypes = {
  formAuthenticity: schemas.formAuthenticity.isRequired,
  t: PropTypes.func.isRequired,
  timeout: PropTypes.number,
  vendorClientSessionsPath: PropTypes.string.isRequired,
  vendorClientRegistrationPath: PropTypes.string.isRequired,
  vendorClientRestorePasswordPath: PropTypes.string.isRequired,
  phoneValue: PropTypes.string,
  clientRegistrationButtonText: PropTypes.string,
};

ClientSessionNewContainer.defaultProps = {
  timeout: 0,
};

export default provideTranslations(ClientSessionNewContainer);
