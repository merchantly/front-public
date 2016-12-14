import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class OrderState extends Component {
  render() {
    const {
      color,
      title,
    } = this.props.state;

    if (!color) {
      return null;
    }
    const classes = classNames({
      'label label-success': !!title,
      'color-box': !title,
    });

    return (
      <span>
        <span className={classes} style={{ backgroundColor: color }}>
          {title ? title : '&nbsp;'}
        </span>
      </span>
    );
  }
}

OrderState.propTypes = {
  state: PropTypes.shape({
    color: PropTypes.object.isRequired,
    title: PropTypes.string,
  }).isRequired,
};

OrderState.defaultProps = {
  state: {},
};

export default OrderState;
