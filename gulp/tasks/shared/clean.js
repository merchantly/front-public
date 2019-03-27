import gulp from 'gulp';
import del from 'del';
import { clean as config } from '../../config';

gulp.task('[Shared] Clean', (cb) => {
  return del(config.dest, cb);
});
