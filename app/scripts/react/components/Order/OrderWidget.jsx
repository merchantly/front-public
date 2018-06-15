import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WidgetLayout from 'rc/Widget/WidgetLayout';
import OrderContainer from './index';

class OrderWidget extends Component {
  render() {
    return (
      <WidgetLayout showMenuTop={false}>
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
