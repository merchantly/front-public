import { task, src, series } from 'gulp';
import mochaPhantomjs from 'gulp-mocha-phantomjs';

task('[Shared] Test', () => {
  return src('test/index.html').pipe(mochaPhantomjs({
    reporter: 'spec'
  }))
});

task('[Shared] Test with build', series(['[Static] Vendor scripts', '[Static] Test scripts'], () => {
  return src('test/index.html').pipe(mochaPhantomjs({
    reporter: 'spec'
  }))
}));
