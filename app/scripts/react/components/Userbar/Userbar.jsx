import React, { Component, PropTypes } from 'react';
import { CabinetButton } from '../buttons/CabinetButton';
import { DesignButton } from '../buttons/DesignButton';
import { OperatorButton } from '../buttons/OperatorButton';
import { WishlistButton } from '../buttons/WishlistButton';
import PublishShopButton from './PublishShopButton';
import DesignSettings from '../DesignSettings/DesignSettingsContainer';
import DesignPreview from '../DesignPreview';
import classNames from 'classnames';

class Userbar extends Component {

  constructor(props) {
    super(props);

    this.state = { launchFromIFrame: false }
  }

  componentWillMount() {
    const launchFromIFrame = window && window != window.top && window.top.KioskOperatorApp;
    this.setState( { launchFromIFrame: launchFromIFrame } );
  }

  render() {
    const {
      authUrl,
      categoryPageUrl,
      pageType,
      productPageUrl,
      cabinetText,
      cabinetUrl,
      designText,
      hasCabinet,
      hasDesign,
      hasOperator,
      hasWishlist,
      openDesignSettingsPopup,
      operatorText,
      operatorUrl,
      publishShopUrl,
      t,
      vendorIsPublished,
      wishlistItemsCount,
      wishlistText,
      wishlistUrl,
      isDesignSettingOpen,
    } = this.props;

    const launchFromIFrame = this.state.launchFromIFrame

    const className = classNames({
      'Userbar': true,
      'TwoBubbles': hasWishlist && wishlistUrl && wishlistItemsCount > 0
    });

    return (
      <div>
        <div className={className}>
          {hasWishlist && wishlistUrl && wishlistItemsCount > 0 &&
            <WishlistButton
              itemsCount={wishlistItemsCount}
              text={wishlistText}
              url={wishlistUrl}
            />
          }
          {hasOperator && operatorUrl && !launchFromIFrame && !isDesignSettingOpen &&
            <OperatorButton
              text={operatorText}
              url={operatorUrl}
            />
          }
          {hasDesign && !isDesignSettingOpen &&
            <DesignButton
              onClick={openDesignSettingsPopup}
              text={designText}
            />
          }
          {hasCabinet && cabinetUrl && !isDesignSettingOpen &&
            <CabinetButton
              text={cabinetText}
              url={cabinetUrl}
            />
          }          
          {vendorIsPublished === false && (
            <PublishShopButton publishShopUrl={publishShopUrl} t={t} />
          )}
        </div>
        <DesignSettings
          authUrl={authUrl}
          categoryPageUrl={categoryPageUrl}
          pageType={pageType}
          productPageUrl={productPageUrl}
        />
        <DesignPreview pageType={pageType} />
      </div>
    );
  }
}

Userbar.propTypes = {
  // design settings props
  authUrl: PropTypes.string.isRequired,
  categoryPageUrl: PropTypes.string,
  pageType: PropTypes.string.isRequired,
  productPageUrl: PropTypes.string,

  // userbar props
  cabinetText: PropTypes.string,
  cabinetUrl: PropTypes.string,
  designText: PropTypes.string,
  hasCabinet: PropTypes.bool,
  operatorText: PropTypes.string,
  operatorUrl: PropTypes.string,
  publishShopUrl: PropTypes.string,
  wishlistText: PropTypes.string,
  wishlistUrl: PropTypes.string,

  t: PropTypes.func.isRequired,

  // redux props
  openDesignSettingsPopup: PropTypes.func.isRequired,
  hasDesign: PropTypes.bool,
  hasOperator: PropTypes.bool,
  hasWishlist: PropTypes.bool,
  vendorIsPublished: PropTypes.bool,
  wishlistItemsCount: PropTypes.number,
};

Userbar.defaultProps = {
  hasCabinet: false,
  hasDesign: false,
  hasOperator: false,
  hasWishlist: false,
};

export default Userbar;
