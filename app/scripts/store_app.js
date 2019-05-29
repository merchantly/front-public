/*global $, Bugsnag, gon */

import 'es5-shim';

import './libs';
import './bundle';

import './lib/ReactRailsUJS';

import 'jquery-ujs';
import './lib/csrfToken';

import './lib/eventsHelper';
import './lib/bugsnagAjax';

import 'app/stylesheets/production.scss';

if (typeof Bugsnag !== 'undefined') {
  const bugsnagScript = document.querySelector('[src$="bugsnag-2.min.js"]');

  if (bugsnagScript) {
    const appVersion = bugsnagScript.getAttribute('data-appversion');

    Bugsnag.appVersion = appVersion + process.env.APP_VERSION;
  }
  Bugsnag.releaseStage = gon.env;
  Bugsnag.notifyReleaseStages = ['production', 'reproduction', 'staging'];
  Bugsnag.metaData = { space: 'public' };
}

$(() => {
  $.ajaxSetup({ cache: true });
  $('[autosubmit]').submit();
  $('.alert.alert-autohide').delay(5000).fadeOut(400);
});
