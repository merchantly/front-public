import React, { Component, PropTypes } from 'react';
import Cookies from 'cookies-js';
import * as cookieKeys from '../../constants/cookieKeys';
import { CabinetButton } from '../buttons/CabinetButton';
import { DesignButton } from '../buttons/DesignButton';
import { OperatorButton } from '../buttons/OperatorButton';
import { WishlistButton } from '../buttons/WishlistButton';

class Userbar extends Component {
  componentDidMount() {
    const { designMode, openDesignSettingsPopup } = this.props;

    switch(designMode) {
      case 'auto':
        if (Cookies.get(cookieKeys.DESIGN_IS_OPEN) === 'true') {
          openDesignSettingsPopup();
        }
        break;
      case 'open':
        openDesignSettingsPopup();
        Cookies.set(cookieKeys.DESIGN_IS_OPEN, true);
        break;
      case 'close':
        Cookies.set(cookieKeys.DESIGN_IS_OPEN, false);
        break;
    }
  }
  render() {
    const {
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
    );
  }
}

Userbar.propTypes = {
  cabinetText: PropTypes.string,
  cabinetUrl: PropTypes.string,
  designMode: PropTypes.string.isRequired,
  designText: PropTypes.string,
  hasCabinet: PropTypes.bool,
  hasDesign: PropTypes.bool,
  hasOperator: PropTypes.bool,
  hasWishlist: PropTypes.bool,
  openDesignSettingsPopup: PropTypes.func.isRequired,
  operatorText: PropTypes.string,
  operatorUrl: PropTypes.string,
  wishlistItemsCount: PropTypes.number,
  wishlistText: PropTypes.string,
  wishlistUrl: PropTypes.string,
};
Userbar.defaultProps = {
  hasCabinet: false,
  hasDesign: false,
  hasOperator: false,
  hasWishlist: false,
};

export default Userbar;
