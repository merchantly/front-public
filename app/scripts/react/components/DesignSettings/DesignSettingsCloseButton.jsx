import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DesignSettingsCloseButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }
  render() {
    return (
      <button
        className="design-settings__close-button"
        onClick={this.props.onClick}
      />
    );
  }
}
