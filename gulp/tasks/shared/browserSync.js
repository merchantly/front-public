import gulp from 'gulp';
import browserSync from 'browser-sync';
import { browserSync as config } from '../../config';

gulp.task('[Shared] BrowserSync', () => {
  browserSync(config);
});