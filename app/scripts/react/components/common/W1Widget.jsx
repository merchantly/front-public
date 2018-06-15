/*global W1 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class W1Widget extends Component {
  componentDidMount() {
    if (typeof W1 !== 'undefined' && W1.widget) {
      W1.widget({
        pt: this.props.w1ptEnabled,
        bigLogo: true,
        grayscale: false,
        blackBg: false,
        fixWidth: '',
        container: 'w1widget',
      });
    }
  }
  render() {
    return <div id="w1widget" />;
  }
}

W1Widget.propTypes = {
  w1ptEnabled: PropTypes.string,
};

W1Widget.defaultProps = {
  w1ptEnabled: '',
};

export default W1Widget;
