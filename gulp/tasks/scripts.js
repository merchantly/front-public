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

gulp.task('[Static] Vendor scripts', (cb) => {
  let bundler = browserify({
    cache: {},
    packageCache: {},
    entries: config.static.vendor.entries,
    extensions: config.static.vendor.extensions,
  });

  requireDependencies('static', bundler);

  bundleLogger.start(config.static.vendor.outputName);

  bundler
    .transform('coffeeify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.static.vendor.outputName))
    .pipe(gulp.dest(config.static.vendor.dest))
    .on('end', () => {
      bundleLogger.end(config.static.vendor.outputName);
      cb();
    });
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

// Build vendorBundle.js from /scripts/render.production.js
// vendorBundle.js is required on every html page in public front
//
gulp.task('[Production] vendorBundle.js', () => {
  const bundler = browserify({
    cache: {},
    packageCache: {},
    entries: config.production.bundle.entries,
    extensions: config.production.bundle.extensions,
  });

  requireDependencies('production', bundler);

  bundleLogger.start(config.production.bundle.outputName);

  return bundler
    .transform('babelify', babelifyOptions )
    .transform('loose-envify', {
      'global': true,
      'NODE_ENV': 'production',
      'APP_VERSION': require('../../package.json').version,
    })
    .transform('coffeeify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.production.bundle.outputName))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    // .pipe(uglify({ mangle: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.production.bundle.dest))
    .on('end', function() {
      bundleLogger.end(config.production.bundle.outputName);
    });
});

// Build public.prerender.production.js from scripts/prerender.production.js
// it used to prerender in production mode
//
gulp.task('[Production] public.prerender.production.js', () => {
  let bundler = browserify({
    cache: {},
    packageCache: {},
    entries: config.production.components.entries,
    extensions: config.production.components.extensions,
  });

  requireDependencies('prerender', bundler);

  bundleLogger.start(config.production.components.outputName);

  return bundler
  .transform('babelify', babelifyOptions )
  .transform('coffeeify')
  .bundle()
  .on('error', handleErrors)
  .pipe(source(config.production.components.outputName))
  .pipe(buffer())
  .pipe(uglify({ mangle: false }))
  .pipe(gulp.dest(config.production.components.dest))
  .on('end', () => {
    bundleLogger.end(config.production.components.outputName);
  });
});

gulp.task('[Development] public.prerender.development.js', () => {
  let bundler = browserify({
    cache: {},
    packageCache: {},
    entries: config.development.components.entries,
    extensions: config.development.components.extensions,
  });

  requireDependencies('prerender', bundler);

  bundleLogger.start(config.development.components.outputName);

  return bundler
  .transform('babelify', babelifyOptions)
  .transform('coffeeify')
  .bundle()
  .on('error', handleErrors)
  .pipe(source(config.development.components.outputName))
  .pipe(gulp.dest(config.development.components.dest))
  .on('end', () => {
    bundleLogger.end(config.development.components.outputName);
  });
});
