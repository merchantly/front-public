/*eslint react/jsx-sort-props:0 */
import React, { Component } from 'react';
// import { Route } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import WidgetRoot from './WidgetRoot';
import 'r/application';

import WelcomeWidget from 'rc/Welcome/WelcomeWidget';
import ProductCardWidget from 'rc/Product/ProductCard/ProductCardWidget';
import CategoriesShowWidget from 'rc/CategoriesShow/CategoriesShowWidget';
import CartWidget from 'rc/Cart/CartWidget';
import OrderWidget from 'rc/Order/OrderWidget';
import DictionaryEntitiesShowWidget from 'rc/DictionaryEntitiesShow/DictionaryEntitiesShowWidget';

class Widget extends Component {
  render() {
    return (
      <BrowserRouter>
        <WidgetRoot>
          <Route path="/" component={WelcomeWidget} />
          <Route path="product/:productId" component={ProductCardWidget} />
          <Route path="category/:categoryId" component={CategoriesShowWidget} />
          <Route path="entities/:entitiesId" component={DictionaryEntitiesShowWidget} />
          <Route path="cart" component={CartWidget} />
          <Route path="checkout" component={OrderWidget} />
        </WidgetRoot>
      </BrowserRouter>
    );
  }
};

export default Widget;
