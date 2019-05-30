// delete this['window']; // React-rails set window to this, it's unexpected behavior
// window = undefined;
require('./locales/numeral/ru');

self.setTimeout = () => { };
self.setInterval = () => { };

self.React = require('react');
self.ReactDOM = require('react-dom');
self.redux = require('./prerender_redux').default;

import './components';
