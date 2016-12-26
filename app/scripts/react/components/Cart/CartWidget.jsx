import React, { Component, PropTypes } from 'react';
import WidgetLayout from 'rc/Widget/WidgetLayout';
import CartContainer from './index';
import {
  fetchCart,
} from 'r/actions/CartActions';
import {
  fetchPackages,
} from 'r/actions/PackagesActions';
import { connect } from 'react-redux';

class CartWidget extends Component {
  componentWillMount() {
    const {
      fetchCart,
      fetchPackages,
    } = this.props;

    fetchCart();
    fetchPackages();
  }
  render() {
    return (
      <WidgetLayout showClientBar={false} showMenuTop={false}>
        <CartContainer />
      </WidgetLayout>
    );
  }
}

CartWidget.propTypes = {
  fetchCart: PropTypes.func.isRequired,
  fetchPackages: PropTypes.func.isRequired,
};

CartWidget.defaultProps = {

};

export default connect(
  null,
  {
    fetchCart,
    fetchPackages,
  }
)(CartWidget);
