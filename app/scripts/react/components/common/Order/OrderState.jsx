import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class OrderState extends Component {
  render() {
    const {
      title,
      bgStyle
    } = this.props.state;

    const classes = classNames({
      'label order-state-label'
    });

    return (
      <span>
        <span className={classes} style={bgStyle}>
          {title}
        </span>
      </span>
    );
  }
}

OrderState.propTypes = {
  state: PropTypes.shape({    
    bgStyle: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

OrderState.defaultProps = {
  state: {},
};

export default OrderState;
