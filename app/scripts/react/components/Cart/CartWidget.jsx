import React, { Component, PropTypes } from 'react';
import WidgetLayout from 'rc/Widget/WidgetLayout';
import CartContainer from './index';

class CartWidget extends Component {
  render() {
    return (
      <WidgetLayout showClientBar={false} showMenuTop={false}>
        <CartContainer />
      </WidgetLayout>
    );
  }
}

CartWidget.propTypes = {

};

CartWidget.defaultProps = {

};

export default CartWidget;
