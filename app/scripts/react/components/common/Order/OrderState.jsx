import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OrderState extends Component {
  render() {
    const {
      title,
      bgStyle
    } = this.props.state;
    
    return (
      <span>
        <span className="label order-state-label" style={bgStyle}>
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
