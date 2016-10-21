import React, { Component } from 'react';
import VendorLayout from './VendorLayout';
import provideTranslations from 'rc/HoC/provideTranslations';
import connectToRedux from 'rc/HoC/connectToRedux';
import { connect } from 'react-redux';
import {
  fetchUserState,
} from 'r/actions/UserStateActions';
import { merge } from 'lodash';

class VendorLayoutContainer extends Component {
  componentWillMount() {
    this.props.fetchUserState();
  }
  render() {
    return <VendorLayout {...this.props} />;
  }
}

VendorLayoutContainer.propTypes = VendorLayout.propTypes;

export default provideTranslations(connectToRedux(connect(
  (state, ownProps) => {
    const {
      showClientBar,
    } = state.userState.data;

    return merge({}, ownProps, {
      navBarProps: {
        showClientBar,
      },
    });
  },
  {
    fetchUserState,
  }
)(VendorLayoutContainer)));
