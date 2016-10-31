/*global $, Bugsnag */

$(() => {
  $(document).ajaxError((event, jqxhr, settings, thrownError) => {
    if (jqxhr.status === 0 || jqxhr.readyState === 0 || settings.suppressError) { // abort & page unload
      return;
    }

    const name = `[AJAX] ${jqxhr.responseJSON.error}`;
    const message = '';
    const metaData = {
      url: settings.url,
      data: settings.data,
      httpMethod: settings.method,
      thrownError: thrownError,
    };
    const severity = 'error';

    Bugsnag.notify(name, message, metaData, severity);
  });

  if (typeof Bugsnag === 'object') {
    Bugsnag.warn = (error, message) => {
      console.warn(error, message); //eslint-disable-line

      Bugsnag.notify(error, message, null, 'warning');
    };
  }
});
