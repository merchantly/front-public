import log from 'fancy-log';
import prettyHrtime from 'pretty-hrtime';
import colors from 'ansi-colors';

let startTime = null;

module.exports = {
  start: function(filepath) {
    startTime = process.hrtime();
    log('Bundling', colors.green(filepath) + '...');
  },

  end: function(filepath) {
    var taskTime = process.hrtime(startTime),
        prettyTime = prettyHrtime(taskTime);
    log('Bundled', colors.green(filepath), 'in', colors.magenta(prettyTime));
  }
};
