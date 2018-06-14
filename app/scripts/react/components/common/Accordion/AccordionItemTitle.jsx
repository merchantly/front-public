import classNames from 'classnames';
import React, { Component } from 'react'; import PropTypes from 'prop-types';

export default class AccordionItemTitle extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string,
    titleClassName: PropTypes.string,
    titleColor: PropTypes.string,
    uuid: PropTypes.string,
  }
  render() {
    const { onClick, title, titleClassName, titleColor, uuid } = this.props;
    const style = {
      color : titleColor,
      cursor: 'pointer',
      margin: 0,
    };

    return (
      <h3
        aria-controls={`react-sanfona-item-body-${ uuid }`}
        className={classNames('react-sanfona-item-title', titleClassName)}
        id={`react-safona-item-title-${ uuid }`}
        onClick={onClick}
        style={style}
      >
        {title}
      </h3>
    );
  }
}