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
  'react16-spinjs': './node_modules/react16-spinjs',
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
  'accounting': './app/bower_components/accounting.js/accounting',
};
const staticDependencies = {
  ' react-dom/test-utils': './node_modules/react-dom/test-utils',
  // 'reactUjs': './app/scripts/lib/ReactRailsUJS',
};
const testDependencies = {
  ' react-dom/test-utils': './node_modules/react-dom/test-utils',
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

exports.externalDependencies = externalDependencies;
exports.requireDependencies = requireDependencies;
