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
    this.props.fetchUserState();
  }
  render() {
    return <NavBar {...this.props} />;
  }
}

NavBarContainer.propTypes = {
  clientBarProps: PropTypes.shape(Clientbar.propTypes).isRequired,
  i18n: PropTypes.object,
  logoProps: PropTypes.shape(Logo.propTypes).isRequired,
  searchQuery: PropTypes.string,
  vendor: schemas.vendor.isRequired,
  t: PropTypes.func.isRequired,

  // redux props
  showClientBar: PropTypes.bool,
  fetchUserState: PropTypes.func.isRequired,
};

NavBarContainer.defaultProps = {
  clientBarProps: {},
  logoProps: {},
  vendor: {
    contacts: [],
    title: '',
    search_products_path: '',
  },
  searchQuery: '',
  showClientBar: false,
};

export default provideTranslations(connectToRedux(connect(
  (state) => ({
      showClientBar: state.userState.data.showClientBar,
  }),
  {
    fetchUserState,
  }
)(NavBarContainer)));
