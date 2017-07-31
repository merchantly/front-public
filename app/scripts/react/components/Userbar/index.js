import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  openDesignSettingsPopup,
} from 'r/actions/popupActions';
import {
  fetchClientState,
} from 'r/actions/ClientStateActions';
import {
  fetchOperatorState,
} from 'r/actions/OperatorStateActions';
import connectToRedux from 'rc/HoC/connectToRedux';
import Userbar from './Userbar';
import Cookies from 'cookies-js';
import * as cookieKeys from 'r/constants/cookieKeys';
import provideTranslations from 'rc/HoC/provideTranslations';
import { canUseDOM } from 'r/helpers/dom';
import { filter } from 'lodash';

class UserbarContainer extends Component {
  componentWillMount() {
    if (!canUseDOM()) return;

    const {
      designMode, // FIXME: remove when moved to api
      fetchClientState,
      fetchOperatorState,
      openDesignSettingsPopup,
      isDesignSettingOpen,
    } = this.props;

    if (designMode) {
      return;
    }

    fetchClientState();
    fetchOperatorState()
      .then(({ response: { designMode, hasDesign } }) => {
        if (!hasDesign) {
          return;
        }

        switch(designMode) {
        case 'open':
          Cookies.set(cookieKeys.DESIGN_IS_OPEN, 'true');
          openDesignSettingsPopup();
          break;
        case 'disable':
          Cookies.set(cookieKeys.DESIGN_IS_OPEN, 'false');
          break;
        default:
          if (Cookies.get(cookieKeys.DESIGN_IS_OPEN) === 'true') {
            openDesignSettingsPopup();
          }
          break;
        }
      });
  }
  render() {
    return <Userbar {...this.props} />;
  }
}

export const externalPropTypes = {
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
  wishlistText: PropTypes.string,
  wishlistUrl: PropTypes.string,
};

UserbarContainer.propTypes = {
  ...externalPropTypes,
  i18n: PropTypes.object,

  // redux props
  openDesignSettingsPopup: PropTypes.func.isRequired,
  fetchClientState: PropTypes.func.isRequired,
  fetchOperatorState: PropTypes.func.isRequired,
  hasDesign: PropTypes.bool,
  hasOperator: PropTypes.bool,
  hasWishlist: PropTypes.bool,
  vendorIsPublished: PropTypes.bool,
  wishlistItemsCount: PropTypes.number,
};

export default provideTranslations(connectToRedux(connect(
  (state, ownProps) => {
    const {
      designMode,
      hasDesign,
      hasOperator,
      vendorIsPublished,
    } = state.operatorState.data;
    const {
      hasWishlist,
      wishlistItemsCount,
    } = state.clientState.data;
    const {
      popups
    } = state.popup;
    
    const isDesignSettingOpen = filter(popups, {'style' : 'DesignSettings'}).length;    

    return Object.assign({}, ownProps, {
      designMode,
      hasDesign,
      hasOperator,
      hasWishlist,
      wishlistItemsCount,
      vendorIsPublished,
      isDesignSettingOpen,
    });
  },
  {
    openDesignSettingsPopup,
    fetchClientState,
    fetchOperatorState,
  }
)(UserbarContainer)));
