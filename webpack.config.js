var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');

// development
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
    test: /\.jsx?$/,
    use: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['@babel/react']
        }
      }
    ],
    exclude: /(node_modules|bower_components)/,
  },
  {
    test: /\.(sass|scss)$/,
    use: [
      // process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
      // { loader: MiniCssExtractPlugin.loader },
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

module.exports = {
  output: {
    path: path.join(__dirname, 'dist/scripts'),
    filename: '[name].js'
  },
  entry: {
    widget: path.join(__dirname, 'app/scripts/react/components/Widget')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.PUBLIC_API_URL': '"http://wannabe.kiiiosk.ru/api"',
      'process.env.OPERATOR_API_URL': '"http://wannabe.kiiiosk.ru/operator/api"',
    })
  ],
  module: {
    // preLoaders: preLoaders,
    rules: rules,
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'app/bower_components'),
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
    extensions: ['.js', '.jsx', '.json'],
  },
};
