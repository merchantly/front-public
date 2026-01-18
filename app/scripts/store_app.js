/*global $, Bugsnag */

import 'es5-shim';

import './libs';
import './bundle';
import 'react_ujs';

// import 'jquery-ujs';
import './lib/csrfToken';

import './lib/eventsHelper';
import './lib/bugsnagAjax';

import 'app/stylesheets/production.scss';

/**
 * Получить значение из meta-тега
 * @param {string} name - имя meta-тега
 * @returns {string|null}
 */
function getMetaContent(name) {
  const meta = document.querySelector(`meta[name="${name}"]`);
  return meta ? meta.content : null;
}

if (typeof Bugsnag !== 'undefined') {
  const bugsnagScript = document.querySelector('[src$="bugsnag-2.min.js"]');

  if (bugsnagScript) {
    const appVersion = bugsnagScript.getAttribute('data-appversion');

    Bugsnag.appVersion = appVersion + process.env.APP_VERSION;
  }
  // Используем meta-тег app-env вместо gon.env
  const appEnv = getMetaContent('app-env');
  if (!appEnv) {
    console.error('[Bugsnag] meta[name="app-env"] not found! Defaulting to "development". Errors may NOT be reported.');
  }
  Bugsnag.releaseStage = appEnv || 'development';
  Bugsnag.notifyReleaseStages = ['production', 'reproduction', 'staging'];
  Bugsnag.metaData = { space: 'public' };
}

$(() => {
  $.ajaxSetup({ cache: true });
  $('[autosubmit]').submit();
  $('.alert.alert-autohide').delay(5000).fadeOut(400);
});
