import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import ClientRegistration from './ClientRegistration';
import * as schemas from 'r/schemas';

class ClientRegistrationPage extends Component {
  render() {
    const {
      formAuthenticity,
      i18n,
      layoutProps,
      timeout,
      vendorRegistrationPath,
      inputFields,
      occupations
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <ClientRegistration {...{
          formAuthenticity,
          i18n,
          timeout,
          vendorRegistrationPath,
          inputFields,
          occupations,
        }}
        />
      </VendorLayoutContainer>
    );
  }
}

ClientRegistrationPage.propTypes = {
  formAuthenticity: schemas.formAuthenticity.isRequired,
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  timeout: PropTypes.number,
  vendorRegistrationPath: PropTypes.string.isRequired,
  inputFields: PropTypes.object,
  occupations:  PropTypes.arrayOf(PropTypes.object),
};

ClientRegistrationPage.defaultProps = {
  inputFields: {
    name: {
      value: '',
      errorMessage: ''
    },
    phone: {
      value: '',
      errorMessage: ''
    },
    email: {
      value: '',
      errorMessage: ''
    },
    occupation_name: {
      presence: false,
      value: '',
      errorMessage: ''
    },
    occupation_id: {
      presence: false,
      value: '',
      errorMessage: ''
    },
    company_name: {
      presence: false,
      value: '',
      errorMessage: ''
    },
  },
  occupations: [],
};

export default ClientRegistrationPage;
