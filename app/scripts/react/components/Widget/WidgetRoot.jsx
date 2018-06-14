import React, { Component } from 'react'; import PropTypes from 'prop-types';
import layoutProps from 'test/fixtures/widget/widget-layout.json';
import connectToRedux from 'rc/HoC/connectToRedux';
import { connect } from 'react-redux';
import {
  initLayout,
} from 'r/actions/LayoutActions';
import 'scripts/resources/gon';

class WidgetRoot extends Component {
  getChildContext() {
    return {
      isWidget: true,
    };
  }
  componentWillMount() {
    this.props.initLayout(layoutProps);
  }
  render() {
    return (
      <div id="kiosk-widget-container">
        {this.props.children}
      </div>
    );
  }
}

WidgetRoot.propTypes = {
  children: PropTypes.element.isRequired,
  initLayout: PropTypes.func.isRequired,
};

WidgetRoot.defaultProps = {
};

WidgetRoot.childContextTypes = {
  isWidget: PropTypes.bool,
};

export default connectToRedux(connect(
  null,
  {
    initLayout,
  }
)(WidgetRoot));
