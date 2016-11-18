/*eslint react/jsx-sort-props:0 */
import 'styles/widget.scss';
import 'styles/lib/cleanslate.css';
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import WidgetRoot from './WidgetRoot';
import 'r/application';

const TEST_NODE_SELECTOR = '#kiosk-widget-test';

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
import CategoriesShowWidget from 'rc/CategoriesShow/CategoriesShowWidget';
import CartWidget from 'rc/Cart/CartWidget';
import OrderWidget from 'rc/Order/OrderWidget';

class Widget extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={WidgetRoot}>
          <IndexRoute component={WelcomeWidget} />
          <Route path="product/:productId" component={ProductCardWidget} />
          <Route path="category/:categoryId" component={CategoriesShowWidget} />
          <Route path="cart" component={CartWidget} />
          <Route path="checkout" component={OrderWidget} />
        </Route>
      </Router>
    );
  }
}

(function loadCss(cb) {
  const el = document.querySelector(TEST_NODE_SELECTOR);
  const styles = window.getComputedStyle(el);

  (function checkCss() {
    if (styles.paddingLeft === '11px') {
      return cb();
    } else {
      setTimeout(checkCss, 100);
    }
  }());
}(() => render(<Widget />, global.mrch.widgetContainer)));
