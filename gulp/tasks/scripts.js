import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
// import streamify from 'gulp-streamify';
import bundleLogger from '../util/bundleLogger';
import handleErrors from '../util/handleErrors';
import { scripts as config } from '../config';
import babelifyOptions from '../babelify_options';

import { requireDependencies } from '../dependencies';
import babel from 'gulp-babel';

gulp.task('show-env', function() {
  console.log('process.env', process.env);
});

gulp.task('[Static] Client scripts', () => {
  let bundler = browserify({
    cache: {},
    packageCache: {},
    entries: config.static.client.entries,
    extensions: config.static.client.extensions,
  });

  externalDependencies('static', bundler);

  function rebundle() {
    bundleLogger.start(config.static.client.outputName);

    bundler.bundle()
      .on('error', handleErrors)
      .pipe(source(config.static.client.outputName))
      .pipe(gulp.dest(config.static.client.dest))
      .on('end', function() {
        bundleLogger.end(config.static.client.outputName);
      });
  }

  if (global.isWatching) {
    bundler = watchify(bundler
      .transform('coffeeify')
      .transform('babelify', babelifyOptions)
    );
    bundler.on('update', rebundle);
  } else {
    bundler
      .transform('coffeeify')
      .transform('babelify', babelifyOptions);
  }

  rebundle();
});

gulp.task('[Static] Test scripts', () => {
  let bundler = browserify({
    cache: {},
    packageCache: {},
    entries: config.static.test.entries,
    extensions: config.static.test.extensions,
  });

  externalDependencies('static', bundler);
  bundler
    .external('react/lib/ReactContext')
    .external('react/lib/ExecutionEnvironment');

  function rebundle() {
    bundleLogger.start(config.static.test.outputName);

    return bundler.bundle()
      .on('error', handleErrors)
      .pipe(source(config.static.test.outputName))
      .pipe(gulp.dest(config.static.test.dest))
      .on('end', function() {
        bundleLogger.end(config.static.test.outputName);
      });
  }

  if (global.isWatching) {
    bundler = watchify(bundler
      .transform('coffeeify')
      .transform('babelify', babelifyOptions)
    );
    bundler.on('update', rebundle);
  } else {
    bundler
      .transform('coffeeify')
      .transform('babelify', babelifyOptions );
  }

  return rebundle();
});

