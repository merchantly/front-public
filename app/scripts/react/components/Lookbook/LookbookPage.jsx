import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VendorLayoutContainer from 'rc/VendorLayout';
import LookbookContainer from './index';
import ImageSlider from 'rc/common/ImageSlider';

class LookbookPage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      title,
      images,
      rtl
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <LookbookContainer {...{
          title,
          images,
          rtl,
        }} />
      </VendorLayoutContainer>
    );
  }
}

LookbookPage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  title: PropTypes.string.isRequired,
  images: ImageSlider.propTypes.slides,
  rtl: PropTypes.bool.isRequired,
};

LookbookPage.defaultProps = {
  rtl: false
}

export default LookbookPage;
