import React, { Component, PropTypes } from 'react';
import WidgetLayout from 'rc/Widget/WidgetLayout';
import OrderContainer from './index';

class OrderWidget extends Component {
  render() {
    return (
      <WidgetLayout>
        <OrderContainer />
      </WidgetLayout>
    );
  }
}

OrderWidget.propTypes = {

};

OrderWidget.defaultProps = {

};

export default OrderWidget;
