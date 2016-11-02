import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import streamify from 'gulp-streamify';
import bundleLogger from '../util/bundleLogger';
import handleErrors from '../util/handleErrors';
import { scripts as config } from '../config';

const baseDependencies = {
  'classnames': './node_modules/classnames',
  'cookies-js': './node_modules/cookies-js',
  'deep-diff': '././node_modules/deep-diff',
  'i18next': './node_modules/i18next',
  'jss': './node_modules/jss/lib',
  'jquery': './node_modules/jquery/dist/jquery',
  'lodash': './node_modules/lodash',
  'nouislider': './node_modules/nouislider/distribute/nouislider',
  'perfect-scrollbar': './node_modules/perfect-scrollbar',
  'react': './node_modules/react',
  'react-dom': './node_modules/react-dom',
  'react-nouislider': './node_modules/react-nouislider',
  'react-redux': './node_modules/react-redux',
  'react-spinjs': './node_modules/react-spinjs',
  'react-stickynode': './node_modules/react-stickynode',
  'redux': './node_modules/redux',
  'redux-thunk': './node_modules/redux-thunk',
  'rodal': './node_modules/rodal',
  'reqwest': './node_modules/reqwest',
  'tinycolor2': './node_modules/tinycolor2',
  'timm': './node_modules/timm',
  'urijs': './node_modules/urijs/src/URI',

  'jquery.mmenu': './app/bower_components/jQuery.mmenu/src/js/jquery.mmenu.min.all',
  'jquery.role': './app/bower_components/jquery.role/lib/jquery.role',
  'jquery.sticky-kit': './app/bower_components/sticky-kit/jquery.sticky-kit',
  'bootstrapSass': './app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
  'eventEmitter': './app/bower_components/eventEmitter/EventEmitter',
  'owlCarousel': './app/bower_components/OwlCarousel/owl-carousel/owl.carousel',
  'fancybox': './app/bower_components/fancybox/source/jquery.fancybox',
  'fancybox.wannabe': './app/bower_components/fancybox-wannabe-fix/index',
  'accounting': './app/bower_components/accounting.js/accounting',
};
const staticDependencies = {
  'react-addons-test-utils': './node_modules/react-addons-test-utils',
  // 'reactUjs': './app/scripts/lib/ReactRailsUJS',
};
const testDependencies = {
  'react-addons-test-utils': './node_modules/react-addons-test-utils',
};
const prerenderDependencies = {
  // For now we will use client version of i18next, but later
  // it can change to i18next-node
  'i18next': './node_modules/i18next',
};

function getDependencies(env) {
  switch (env) {
    case 'static':
      return {...baseDependencies, ...staticDependencies };
    case 'test':
      return {...baseDependencies, ...testDependencies };
    case 'prerender':
      return {...baseDependencies, ...prerenderDependencies };
    default:
      return baseDependencies;
  }
}

function requireDependencies(env, bundler) {
  const dependencies = getDependencies(env);

  Object.keys(dependencies).forEach((dep) => {
    bundler.require(dependencies[dep], { expose: dep });
  });
}

function externalDependencies(env, bundler) {
  const dependencies = getDependencies(env);

  Object.keys(dependencies).forEach((dep) => {
    bundler.external(dep);
  });
}

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
      .transform('coffee-reactify')
      .transform('babelify', {
        ignore: /(node_modules|bower_components)/,
      })
    );
    bundler.on('update', rebundle);
  } else {
    bundler
      .transform('coffee-reactify')
      .transform('babelify', {
        ignore: /(node_modules|bower_components)/,
      });
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
    .transform('coffee-reactify')
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
      .transform('coffee-reactify')
      .transform('babelify', {
        ignore: /(node_modules|bower_components)/,
      })
    );
    bundler.on('update', rebundle);
  } else {
    bundler
      .transform('coffee-reactify')
      .transform('babelify', {
        ignore: /(node_modules|bower_components)/,
      });
  }

  return rebundle();
});

gulp.task('[Production] Scripts', () => {
  const bundler = browserify({
    cache: {},
    packageCache: {},
    entries: config.production.bundle.entries,
    extensions: config.production.bundle.extensions,
  });

  requireDependencies('production', bundler);

  bundleLogger.start(config.production.bundle.outputName);

  return bundler
    .transform('babelify', {
      ignore: /(node_modules|bower_components)/,
    })
    .transform('loose-envify', {
      'global': true,
      'NODE_ENV': 'production',
      'APP_VERSION': require('../../package.json').version,
    })
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.production.bundle.outputName))
    .pipe(streamify(uglify({ mangle: true })))
    .pipe(gulp.dest(config.production.bundle.dest))
    .on('end', function() {
      bundleLogger.end(config.production.bundle.outputName);
    });
});

gulp.task('[Production] Components scripts', () => {
  let bundler = browserify({
    cache: {},
    packageCache: {},
    entries: config.production.components.entries,
    extensions: config.production.components.extensions,
  });

  requireDependencies('prerender', bundler);

  bundleLogger.start(config.production.components.outputName);

  return bundler
    .transform('babelify', {
      ignore: /(node_modules|bower_components|prerender.bundle\.js)/,
    })
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.production.components.outputName))
    .pipe(streamify(uglify({ mangle: false })))
    .pipe(gulp.dest(config.production.components.dest))
    .on('end', () => {
      bundleLogger.end(config.production.components.outputName);
    });
});

gulp.task('[Development] Components scripts', () => {
  let bundler = browserify({
    cache: {},
    packageCache: {},
    entries: config.development.components.entries,
    extensions: config.development.components.extensions,
  });

  requireDependencies('prerender', bundler);

  bundleLogger.start(config.development.components.outputName);

  return bundler
    .transform('babelify', {
      ignore: /(node_modules|bower_components|prerender.bundle\.js)/,
    })
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.development.components.outputName))
    .pipe(gulp.dest(config.development.components.dest))
    .on('end', () => {
      bundleLogger.end(config.development.components.outputName);
    });
});
