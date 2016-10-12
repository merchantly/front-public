import React, { Component } from 'react';
import { Provider } from 'react-redux';

export default function(WrappedComponent) {
  class ReduxConnection extends Component {
    render() {
      return (
        <Provider store={global.redux}>
          <WrappedComponent {...this.props} />
        </Provider>
      );
    }
  }

  ReduxConnection.wrapped = WrappedComponent;

  return ReduxConnection;
}
