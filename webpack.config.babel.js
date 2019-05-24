import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import babelifyOptions from './gulp/babelify_options';

// development
//plugins: [
  //new webpack.DefinePlugin({
    //'process.env.NODE_ENV': '"production"',
    //'process.env.PUBLIC_API_URL': '"http://wannabe.kiiiosk.ru/api"',
    //'process.env.OPERATOR_API_URL': '"http://wannabe.kiiiosk.ru/operator/api"',
  //})
//],
//
//config.devtool = 'source-map';
//config.output = {
  //path: 'build/scripts',
  //filename: '[name].js',
//};
//config.plugins = [
  //new webpack.optimize.OccurenceOrderPlugin(),
  //new webpack.DefinePlugin({
    //'process.env.NODE_ENV': '"development"',
    //'process.env.PUBLIC_API_URL': '"http://wannabe.3001.brandymint.ru/api"',
    //'process.env.OPERATOR_API_URL': '"http://wannabe.vagrant.dev:3000/operator/api"',
    //'process.env.IMAGES_PATH': '"../images"',
    //'process.env.FONTS_PATH': '"../fonts"',
  //}),
//];

// TODO
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
var rules = [
  {
    test: /\.coffee$/,
    use: [
      {
        loader: 'coffee-loader' ,
        options: { transpile: babelifyOptions }
      }
    ],
    exclude: /(node_modules|bower_components)/,
  },
  {
    test: /\.jsx?$/,
    use: [
      'cache-loader',
      {
        loader: 'babel-loader',
        query: babelifyOptions
      }
    ],
    exclude: /(node_modules|bower_components)/,
  },
  {
    test: /\.(sass|scss)$/,
    use: [
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [
              path.resolve(__dirname, './app/stylesheets'),
              path.resolve(__dirname, './app/bower_components'),
              path.resolve(__dirname, './node_modules'),
          ]
        }
      }
    ],
    exclude: /(node_modules|bower_components)/,
  },
  {
    test: /\.css$/,
    use: [
      // MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader'
      },
    ],
    exclude: /(node_modules|bower_components)/,
  },
  //{
    //test: /\.json$/,
    //use: [
      //{ loader: 'json-loader' }
    //]
  //},
];

const baseConfig = {
  // devtool: 'inline-source-map',
  module: {
    rules: rules,
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
      // path.join(__dirname, 'app/bower_components'),
      path.join(__dirname, 'node_modules/@bower_components'),
    ],
    alias: {
      'fancybox': 'fancybox/source/jquery.fancybox',
      'fancybox.wannabe': 'fancybox-wannabe-fix/index',
      'bootstrapSass': 'bootstrap-sass-official/assets/javascripts/bootstrap',
      'jquery': 'jquery/dist/jquery',
      'owlCarousel': 'OwlCarousel/owl-carousel/owl.carousel',
      'jquery.mmenu': 'jQuery.mmenu/src/js/jquery.mmenu.min.all',
      'jquery.role': 'jquery.role/lib/jquery.role',
    },
    extensions: ['.js', '.jsx', '.json', '.coffee'],
  },
};

const nodeConfig = {
  output: {
    path: path.join(__dirname, 'dist/scripts/node'),
    filename: '[name].js'
  },
  entry: {
    store_app: path.join(__dirname, 'app/scripts/store_app_prerender')
  },
  target: 'node'
}

const browserConfig = {
  output: {
    path: path.join(__dirname, 'dist/scripts'),
    filename: '[name].js'
  },
  entry: {
    widget: path.join(__dirname, 'app/scripts/react/components/Widget'),
    store_app: path.join(__dirname, 'app/scripts/store_app'),
  },
  target: 'web'
}

exports.default = [ merge(baseConfig, nodeConfig), merge(baseConfig, browserConfig)]
