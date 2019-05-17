import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import handleErrors from '../../util/handleErrors';
import { styles as config } from '../../config';

gulp.task('[Production] Styles', () => {
  return gulp.src(config.production.src)
    .on('error', handleErrors)
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: 'normal',
      includePaths: [
        './app/stylesheets/',
        './app/bower_components/',
        './app/bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap',
        './node_modules',
      ],
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCss())
    .pipe(rename(config.production.outputName))
    .pipe(gulp.dest(config.production.dest));
});
