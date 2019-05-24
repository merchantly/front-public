import gulp from 'gulp';
import { task, series, parallel, dest } from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import handleErrors from '../util/handleErrors';
import babelifyOptions from '../babelify_options';

const babel = require('gulp-babel');

const src='./test.js';

gulp.task('test_build', () => {
  //return browserify(src, { extensions: ['.js', '.jsx', '.cjsx', '.coffee'] })
  //// .transform('babelify', babelifyOptions )
  //.transform('loose-envify', {
    //'global': true,
    //'NODE_ENV': 'production'
  //})
  //.transform('coffeeify')
  //.bundle()
  return gulp.src(src)
  .pipe(babel())
  //.pipe(source(src))
  //.pipe(buffer())
  //.pipe(sourcemaps.init({loadMaps: true}))
  //.pipe(uglify({ mangle: true }))
  //// .pipe(fs.createWriteStream("test_bundle.js"))
  //.pipe(sourcemaps.write('./'))
  .pipe(dest('./dist/'))
});
