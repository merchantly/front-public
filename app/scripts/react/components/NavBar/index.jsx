import React, { Component, PropTypes } from 'react';
import * as schemas from 'r/schemas';
import provideTranslations from 'rc/HoC/provideTranslations';
import connectToRedux from 'rc/HoC/connectToRedux';
import NavBar from './NavBar';
import Logo from 'rc/Logo';
import { Clientbar } from 'rc/Clientbar';
import { connect } from 'react-redux';
import {
  fetchUserState,
} from 'r/actions/UserStateActions';

class NavBarContainer extends Component {
  componentWillMount() {
    const {
      fetchUserState,
      checkCurrentClient,
    } = this.props;

    if (checkCurrentClient) {
      fetchUserState();
    }
  }
  render() {
    return <NavBar {...this.props} />;
  }
}

export const externalPropTypes = {
  checkCurrentClient: PropTypes.bool,
  clientBarProps: PropTypes.shape(Clientbar.propTypes).isRequired,
  i18n: PropTypes.object,
  logoProps: PropTypes.shape(Logo.propTypes).isRequired,
  searchQuery: PropTypes.string,
  showClientBar: PropTypes.bool,
  vendor: schemas.vendor.isRequired,
};

NavBarContainer.propTypes = {
  ...externalPropTypes,
  t: PropTypes.func.isRequired,

  // redux props
  fetchUserState: PropTypes.func.isRequired,
};

NavBarContainer.defaultProps = {
  checkCurrentClient: false,
  clientBarProps: {},
  logoProps: {},
  vendor: {
    contacts: [],
    title: '',
    search_products_path: '',
  },
  searchQuery: '',
  showClientBar: true,
};

export default provideTranslations(connectToRedux(connect(
  (state, { checkCurrentClient, showClientBar }) => ({
      showClientBar: checkCurrentClient
        ? state.userState.data.isCurrentClientPresent
        : showClientBar,
  }),
  {
    fetchUserState,
  }
)(NavBarContainer)));
