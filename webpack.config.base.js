var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var widgetPath = './app/scripts/react/components/Widget';
var rules = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /(node_modules|bower_components)/,
  },
  { test: /\.haml$/, loader: "haml-haml-loader" },
  {
    test: /\.(sass|scss)$/,
    use: [{
      loader: "style-loader",
      options: {
        exclude: /(node_modules|bower_components)/,
      }
    }, {
      loader: "css-loader",
      options: {
        exclude: /(node_modules|bower_components)/,
      }
    }, {
      loader: "sass-loader",
      options: {
        exclude: /(node_modules|bower_components)/,
      }
    }]
  },
  {
    test: /\.css$/,
    loader: "css-loader",
    options: {
      exclude: /(node_modules|bower_components)/,
    }
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
];

//var preLoaders = [
  //{
    //test: /\.(sass|scss)$/,
    //loader: 'string-replace',
    //query: {
      //multiple: [
        //{
          //search: 'IMAGES_PATH',
          //replace: process.env.ENV === 'production' ? "'/shop/images'" : "'../images'",
        //},
        //{
          //search: 'FONTS_PATH',
          //replace: process.env.ENV === 'production' ? "'/shop/fonts'" : "'../fonts'",
        //},
      //],
    //},
  //},
//];
module.exports = {
  entry: {
    'widget': widgetPath,
    'index': './app/haml/index.haml',
  },
  module: {
    // preLoaders: preLoaders,
    rules: rules,
  },
  resolveLoader: {
    modules: ["app/stylesheets", "node_modules", "app/bower_components"]
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
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'app/bower_components'),
    ],
  },
};
