import React, { Component, PropTypes } from 'react';
import WidgetLayout from './WidgetLayout';

class WidgetLayoutContainer extends Component {
  render() {
    return (
      <WidgetLayout {...this.props} />
    );
  }
}

WidgetLayoutContainer.propTypes = {

};

WidgetLayoutContainer.defaultProps = {

};

export default WidgetLayoutContainer;
