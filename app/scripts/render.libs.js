window._ = require('lodash');
window.I18n = require('i18next'); // Fallback for rails I18n
window.$ = window.jQuery = require('jquery');
window.React = require('react');
window.ReactDOM = require('react-dom');
window.EventEmitter = require('eventEmitter');
window.accounting = require('accounting');

// jQuery plugins
require('jquery.role');
require('jquery.mmenu');
require('sticky-kit/jquery.sticky-kit');

// Others
require('bootstrapSass');
require('owlCarousel');
require('fancybox');
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
