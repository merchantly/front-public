import React, { Component } from 'react'; import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import ErrorPageContainer from './index';

class ErrorPagePage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      subject,
      content,
      phone,
      email
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <ErrorPageContainer {...{
          subject,
          content,
          phone,
          email
        }} />
      </VendorLayoutContainer>
    );
  }
}

ErrorPagePage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  subject: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default ErrorPagePage;