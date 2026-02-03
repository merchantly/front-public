import React, { createElement, render } from 'react';
import { ProductCardContainer } from '../../components/Product/ProductCard';
import './index.scss';

mrch && mrch.registerWidget('ProductCard', {
  render(props, node) {
    render(createElement(ProductCardContainer, props), node);
  },
});