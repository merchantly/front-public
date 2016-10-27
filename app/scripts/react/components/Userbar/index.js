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

class UserbarContainer extends Component {
  componentWillMount() {
    const {
      designMode, // FIXME: remove when moved to api
      fetchClientState,
      fetchOperatorState,
      openDesignSettingsPopup,
    } = this.props;

    if (designMode) {
      return;
    }

    fetchClientState();
    fetchOperatorState()
      .then(({ response: { designMode } }) => {
        switch(designMode) {
        case 'open':
          Cookies.set(cookieKeys.DESIGN_IS_OPEN, true);
          openDesignSettingsPopup();
          break;
        case 'disable':
          Cookies.set(cookieKeys.DESIGN_IS_OPEN, false);
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
};

UserbarContainer.propTypes = {
  ...externalPropTypes,

  // redux props
  openDesignSettingsPopup: PropTypes.func.isRequired,
  fetchClientState: PropTypes.func.isRequired,
  fetchOperatorState: PropTypes.func.isRequired,
  hasDesign: PropTypes.bool,
  hasOperator: PropTypes.bool,
  hasWishlist: PropTypes.bool,
  wishlistItemsCount: PropTypes.number,
};

export default connectToRedux(connect(
  (state, ownProps) => {
    const {
      designMode,
      hasDesign,
      hasOperator,
    } = state.clientState.data;
    const {
      hasWishlist,
      wishlistItemsCount,
    } = state.operatorState.data;

    return Object.assign({}, ownProps, {
      designMode,
      hasDesign,
      hasOperator,
      hasWishlist,
      wishlistItemsCount,
    });
  },
  {
    openDesignSettingsPopup,
    fetchClientState,
    fetchOperatorState,
  }
)(UserbarContainer));
