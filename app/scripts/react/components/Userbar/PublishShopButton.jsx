import React, { Component, PropTypes } from 'react';
import Bubble from 'rc/buttons/Bubble';

class PublishShopButton extends Component {
  render() {
    const {
      publishShopUrl,
      t,
    } = this.props;

    return (
      <Bubble
        className="Bubble--publish"
        data={{ method: 'post' }}
        text={t('vendor.button.publish_shop.text')}
        url={publishShopUrl}
      />
    );
  }
}

PublishShopButton.propTypes = {
  className: PropTypes.string,
  publishShopUrl: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default PublishShopButton;
