/*eslint react/jsx-sort-props:0 */
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import WidgetLayoutContainer from './WidgetLayoutContainer';
import 'r/application';

import jQuery from 'jquery';
global.jQuery = jQuery;
require('jquery.role');
require('bootstrapSass');
require('jquery.mmenu');
require('owlCarousel');
require('fancybox');
require('fancybox.wannabe');
jQuery.noConflict(true);


import WelcomeWidget from 'rc/Welcome/WelcomeWidget';
import ProductCardWidget from 'rc/Product/ProductCard/ProductCardWidget';

class Widget extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={WidgetLayoutContainer}>
          <IndexRoute component={WelcomeWidget} />
          <Route path="product/:productId" component={ProductCardWidget} />
        </Route>
      </Router>
    );
  }
}

render(<Widget />, global.mrch.widgetContainer);
