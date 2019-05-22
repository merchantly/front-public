var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var widgetPath = './app/scripts/react/components/Widget';
var preLoaders = [
  {
    test: /\.(sass|scss)$/,
    loader: 'string-replace',
    query: {
      multiple: [
        {
          search: 'IMAGES_PATH',
          replace: process.env.ENV === 'production' ? "'/shop/images'" : "'../images'",
        },
        {
          search: 'FONTS_PATH',
          replace: process.env.ENV === 'production' ? "'/shop/fonts'" : "'../fonts'",
        },
      ],
    },
  },
];
var loaders = [
  {
    test: /\.jsx?$/,
    loader: 'babel',
    exclude: /(node_modules|bower_components)/,
  },
  {
    test: /\.(sass|scss)$/,
    loader: 'style!raw!sass',
    exclude: /(node_modules|bower_components)/,
  },
  {
    test: /\.css$/,
    loader: 'style!css',
    exclude: /(node_modules|bower_components)/,
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
];

module.exports = {
  entry: {
    'widget': widgetPath,
  },
  module: {
    // preLoaders: preLoaders,
    loaders: loaders,
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './app/stylesheets'),
      path.resolve(__dirname, './app/bower_components'),
      path.resolve(__dirname, './node_modules'),
    ],
  },
  resolve: {
    alias: {
      'fancybox': 'fancybox/source/jquery.fancybox',
      'fancybox.wannabe': 'fancybox-wannabe-fix/index',
      'bootstrapSass': 'bootstrap-sass-official/assets/javascripts/bootstrap',
      'jquery': 'jquery/dist/jquery',
      'owlCarousel': 'OwlCarousel/owl-carousel/owl.carousel',
      'jquery.mmenu': 'jQuery.mmenu/src/js/jquery.mmenu.min.all',
      'jquery.role': 'jquery.role/lib/jquery.role',
    },
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'app/bower_components'),
    ],
  },
};
