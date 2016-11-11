import React, { Component, PropTypes } from 'react';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import WidgetLayoutContainer from './WidgetLayoutContainer';

import WelcomeWidget from 'rc/Welcome/WelcomeWidget';

class Widget extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={WidgetLayoutContainer}>
          <IndexRoute component={WelcomeWidget} />
        </Route>
      </Router>
    );
  }
}

Widget.propTypes = {

};

Widget.defaultProps = {

};

export default WidgetLayoutContainer;
