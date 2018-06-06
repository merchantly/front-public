import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Icon extends Component {
  static propTypes = {
    active: PropTypes.bool,
    name: PropTypes.string,
  }
  render() {
    const { active, name } = this.props;

    if (name) {
      const iconClasses = classNames({
        'Icon': true,
        ['Icon--' + name]: true,
        'Icon--active': active,
      });

      return (
        <i className={iconClasses} />
      );
    }

    return null;
  }
}