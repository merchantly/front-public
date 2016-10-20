import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import handleErrors from '../../util/handleErrors';
import { styles as config } from '../../config';

gulp.task('[Static] Styles', () => {
  return gulp.src(config.static.src)
    .on('error', handleErrors)
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: 'normal',
      includePaths: [
        './app/stylesheets/',
        './app/bower_components/',
        './app/bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap',
        './node_modules/',
      ],
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename(config.static.outputName))
    .pipe(gulp.dest(config.static.dest));
});
