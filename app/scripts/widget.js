import 'styles/widget.scss';
import 'styles/lib/cleanslate.css';

import React from 'react';
import { render } from 'react-dom';
import Widget from 'app/scripts/react/components/Widget';

// import jQuery from 'jquery';
// global.jQuery = jQuery;
// global.$ = jQuery;

// require('@bower_components/bootstrap-sass-official/assets/javascripts/bootstrap');
require('@bower_components/jQuery.mmenu/src/js/jquery.mmenu.min.all');
require('@bower_components/OwlCarousel/src/js/owl.carousel');
require('@bower_components/fancybox/source/jquery.fancybox');
// Отключил вообще fancybox.wannabe
// Если это нужно будет, то нужно клонировать
// fancybox и вносить в него правки
jQuery.noConflict(true);

// const TEST_NODE_SELECTOR = '#merchantly-widget-container';

(function loadCss(cb) {
  cb();
  //const el = document.querySelector(TEST_NODE_SELECTOR);
  //const styles = window.getComputedStyle(el);

  // Загружаем widget когда CSS готова.
  // Определяем то через такой костыль
  //(function checkCss() {
    //if (styles.paddingLeft === '11px') {
      //console.log('CSS is read, mount widget');
      //return cb();
    //} else {
      //console.log('Wait for checkCss');
      //setTimeout(checkCss, 100);
    //}
  //}());
}(() => render(<Widget />, global.mrch.widgetContainer)));
