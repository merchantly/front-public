import React, { Component } from 'react'; import PropTypes from 'prop-types';
import Bubble from '../Bubble';

export default class OperatorButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    url: PropTypes.string.isRequired,
  }
  render() {
    const { text, url } = this.props;

    return (
      <Bubble
        className="Bubble--operator element--active-opacity"
        text={text}
        url={url}
      />
    );
  }
}