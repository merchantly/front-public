import React, { Component } from 'react'; import PropTypes from 'prop-types';
import Bubble from '../Bubble';

export default class CabinetButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    url: PropTypes.string.isRequired,
  }
  render() {
    return (
      <Bubble
        {...this.props}
        className="Bubble--cabinet element--active-opacity"
      />
    );
  }
}