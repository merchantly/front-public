import React, { Component } from 'react'; import PropTypes from 'prop-types';
import classNames from 'classnames';

class Alert extends Component {
  render() {
    const { className, danger, info, text } = this.props;
    const alertClasses = classNames(className, {
      'alert': true,
      'alert-info': info,
      'alert-danger': danger,
    });

    return (
      <div className={alertClasses}>
        {text}
      </div>
    );
  }
}

Alert.propTypes = {
  className: PropTypes.string,
  danger: PropTypes.bool,
  info: PropTypes.bool,
  text: PropTypes.string.isRequired,
};
Alert.defaultProps = {
  danger: false,
  info: false,
};

export default Alert;