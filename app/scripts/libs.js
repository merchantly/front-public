// Migrate to webpack's externals - https://webpack.js.org/configuration/externals/
//
window._ = require('lodash');
window.I18n = require('i18next'); // Fallback for rails I18n
window.$ = window.jQuery = require('jquery');
window.React = require('react');
window.ReactDOM = require('react-dom');
window.EventEmitter = require('@bower_components/eventEmitter');
window.accounting = require('@bower_components/accounting.js');

// jQuery plugins
require('@bower_components/jQuery.mmenu/src/js/jquery.mmenu.min.all');
require('@bower_components/sticky-kit/jquery.sticky-kit');

// Others
require('@bower_components/bootstrap-sass-official/assets/javascripts/bootstrap');
require('@bower_components/OwlCarousel/owl-carousel/owl.carousel');
require('@bower_components/fancybox/source/jquery.fancybox');

require('nouislider');

window.accounting.settings = gon.accounting_settings || {
  currency: {
    symbol: 'руб.', // default currency symbol is '$'
    format: '%v %s', // controls output: %s = symbol, %v = value/number (can be object: see below)
    decimal: ',', // decimal point separator
    thousand: ' ', // thousands separator
    precision: 0, // decimal places
  },
  number: {
    precision: 0, // default precision on numbers is 0
    thousand: '',
    decimal: ',',
  },
};
