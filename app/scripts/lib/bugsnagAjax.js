/*global $, Bugsnag */

$(() => {

  $(document).ajaxError((event, jqxhr, settings, thrownError) => {
    if (jqxhr.status === 0 || jqxhr.readyState === 0 || settings.suppressError) { // abort & page unload
      return;
    }

    const name = `[AJAX] ${settings.url} error`;
    const metaData = {
      url: settings.url,
      data: settings.data,
      httpMethod: settings.method,
      thrownError: thrownError,
    };
    Bugsnag.notify(name, thrownError, metaData, 'error');
  });

  if (typeof Bugsnag === 'object') {
    Bugsnag.beforeNotify = (error, metaData) -> {
      error.stacktrace = error.stacktrace.replace(/chrome-extension:/g, "chrome_extension:");
    }

    Bugsnag.warn = (error, message) => {
      console.warn(error, message); //eslint-disable-line

      Bugsnag.notify(error, message, null, 'warning');
    };
  }
});
