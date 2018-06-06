import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import DictionaryContainer from './index';

class DictionaryPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      title,
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <DictionaryContainer title={title} />
      </VendorLayoutContainer>
    );
  }
}

DictionaryPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  title: PropTypes.string.isRequired,
};

export default DictionaryPage;
