import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import connectToRedux from '../HoC/connectToRedux';
import Logo from './index';
import { getIn } from 'timm';

@connect((state) => ({
  globalLogoUrl: getIn(state.design, ['current', 'logoUrl']),
}))
class LogoContainer extends Component {
  static propTypes = {
    globalLogoUrl: PropTypes.string,
    linkUrl: PropTypes.string.isRequired,
    logoText: PropTypes.string.isRequired,
    logoUrl: PropTypes.string,
    imageAlt: PropTypes.string,
  };
  state = {
    logoUrl: this.props.logoUrl || this.props.globalLogoUrl,
  };
  componentWillReceiveProps(nextProps) {
    if (this.state.logoUrl !== nextProps.globalLogoUrl) {
      this.setState({ logoUrl: nextProps.globalLogoUrl });
    }
  }
  render() {
    return (
      <Logo {...this.props}
        logoUrl={this.state.logoUrl}
      />
    );
  }
}

export default connectToRedux(LogoContainer);
