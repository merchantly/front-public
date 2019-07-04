import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Timer from '../../entities/Timer';

export default class Notice extends Component {
  static propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    type: PropTypes.string.isRequired,
    timeout: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    onClick: PropTypes.func
  }
  componentDidMount() {
    this.timer = new Timer(this.close.bind(this), this.props.timeout);
  }
  componentWillUnmount() {
    this.pause();
  }
  render() {
    const onClickEvent = this.props.onClick || this.close;

    return (
      <div
        className={`b-notice b-notice_${this.props.type}`}
        onClick={onClickEvent.bind(this)}
        onMouseEnter={this.pause.bind(this)}
        onMouseLeave={this.resume.bind(this)}
      >
        <div className="notice-inner">
          {this.props.text}
        </div>
      </div>
    );
  }
  close() {
    $(findDOMNode(this)).fadeOut('fast', this.props.onClose);
  }
  pause() {
    this.timer.pause();
  }
  resume() {
    this.timer.resume();
  }
}