import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class OrderState extends Component {
  render() {
    const {
      color,
      title,
      bgStyle,
    } = this.props.state;

    var style;
    
    if (bgStyle) {
      style = bgStyle;
      style["marginLeft"] = "3px";      
    } else {
      if (!color) {
        return null;
      }
      style = { "marginLeft" : "3px", "backgroundColor" : color}
    }

    const classes = classNames({
      'label label-success': !!title,
      'color-box': !title,
    });

    return (
      <span>
        <span className={classes} style={ style ? style : null }>
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
