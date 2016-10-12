import React, { Component, PropTypes } from 'react';

class PublishShopButton extends Component {
  render() {
    const {
      className,
      publishShopPath,
      t,
    } = this.props;

    return (
      <a
        data-method="post"
        href={publishShopPath}
      >
        <span className={className} title={t('vendor.button.publish_shop.title')}>
          {t('vendor.button.publish_shop.text')}
        </span>
      </a>
    );
  }
}

PublishShopButton.propTypes = {
  className: PropTypes.string,
  publishShopPath: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default PublishShopButton;
