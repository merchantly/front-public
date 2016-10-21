import React, { Component, PropTypes } from 'react';
import { CabinetButton } from '../buttons/CabinetButton';
import { DesignButton } from '../buttons/DesignButton';
import { OperatorButton } from '../buttons/OperatorButton';
import { WishlistButton } from '../buttons/WishlistButton';
import DesignSettings from '../DesignSettings/DesignSettingsContainer';
import DesignPreview from '../DesignPreview';

class Userbar extends Component {
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
      wishlistItemsCount,
      wishlistText,
      wishlistUrl,
    } = this.props;

    return (
      <div>
        <div className="Userbar">
          {hasOperator && operatorUrl &&
            <OperatorButton
              text={operatorText}
              url={operatorUrl}
            />
          }
          {hasDesign &&
            <DesignButton
              onClick={openDesignSettingsPopup}
              text={designText}
            />
          }
          {hasCabinet && cabinetUrl &&
            <CabinetButton
              text={cabinetText}
              url={cabinetUrl}
            />
          }
          {hasWishlist && wishlistUrl &&
            <WishlistButton
              itemsCount={wishlistItemsCount}
              text={wishlistText}
              url={wishlistUrl}
            />
          }
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
  categoryPageUrl: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  productPageUrl: PropTypes.string.isRequired,

  // userbar props
  cabinetText: PropTypes.string,
  cabinetUrl: PropTypes.string,
  designText: PropTypes.string,
  hasCabinet: PropTypes.bool,
  operatorText: PropTypes.string,
  operatorUrl: PropTypes.string,
  wishlistText: PropTypes.string,
  wishlistUrl: PropTypes.string,

  // redux props
  openDesignSettingsPopup: PropTypes.func.isRequired,
  hasDesign: PropTypes.bool,
  hasOperator: PropTypes.bool,
  hasWishlist: PropTypes.bool,
  wishlistItemsCount: PropTypes.number,
};

Userbar.defaultProps = {
  hasCabinet: false,
  hasDesign: false,
  hasOperator: false,
  hasWishlist: false,
};

export default Userbar;
