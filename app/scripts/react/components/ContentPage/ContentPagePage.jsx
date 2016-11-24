import React, { Component, PropTypes } from 'react';
import VendorLayoutContainer from 'rc/VendorLayout';
import ContentPageContainer from './index';

class ContentPagePage extends Component {
  render() {
    const {
      i18n,
      layoutProps,
      title,
      text,
      images
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <ContentPageContainer {...{
          title,
          text,
          images,
        }} />
      </VendorLayoutContainer>
    );
  }
}

ContentPagePage.propTypes = {
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  images: ImageSlider.propTypes.slides
};

export default ContentPagePage;