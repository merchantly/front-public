import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { reduce } from 'lodash';

class Bubble extends Component {
  getDataAttributes(data) {
    if (data) {
      return reduce(data, (acc, val, attr) => ({
        ...acc,
        [`data-${attr}`]: val,
      }), {});
    } else {
      return {};
    }
  }
  handleClick(ev) {
    if (this.props.onClick) {
      ev.preventDefault();
      this.props.onClick();
    }
  }
  render() {
    const { className, count, data, text, url } = this.props;
    const bubbleClasses = classNames({
      'Bubble': true,
      'Bubble--with-text': !!text,
    }, className);

    return (
      <a
        {...this.getDataAttributes(data)}
        className={bubbleClasses}
        href={url || '#'}
        onClick={this.handleClick.bind(this)}
      >
        {!!text && <span className="Bubble-text">{text}</span>}
        {!!count && <span className="Bubble-count">{count}</span>}
      </a>
    );
  }
}

Bubble.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number,
  data: PropTypes.object,
  onClick: PropTypes.func,
  text: PropTypes.string,
  url: PropTypes.string,
};

export default Bubble;
