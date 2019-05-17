require("babel-register");
var path = require('path');

module.exports = {
  entry: {
    widget: './app/scripts/react/components/Widget/index.jsx'
  },
  devServer: {
    disableHostCheck: true,
    // contentBase: path.join(__dirname, 'build'),
    port: 9000
  },
  output: {
    path: path.join(__dirname, 'build/scripts'),
    filename: '[name].js'
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
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
        exclude: /(node_modules|bower_components)/,
        //path.resolve(__dirname, './app/stylesheets'),
        //path.resolve(__dirname, './app/bower_components'),
        //path.resolve(__dirname, './node_modules'),
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
        exclude: /(node_modules|bower_components)/,
      },
      //{
        //test: /\.json$/,
        //loader: 'json-loader',
      //},
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            // good way to have all settings in .babelrc
            // but we must use here this presets to available <div> and other html JSX elements
            query: {
              presets: ['@babel/react']
            }
          }
        ],
        exclude: /(node_modules|bower_components)/,
      }
    ]
  }
};

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
// development
//
//'process.env.NODE_ENV': '"development"',
//'process.env.PUBLIC_API_URL': '"http://wannabe.3001.brandymint.ru/api"',
//'process.env.OPERATOR_API_URL': '"http://wannabe.vagrant.dev:3000/operator/api"',
//'process.env.IMAGES_PATH': '"../images"',
//'process.env.FONTS_PATH': '"../fonts"',


// production
//
//new webpack.DefinePlugin({
  //'process.env.NODE_ENV': '"production"',
  //'process.env.PUBLIC_API_URL': '"http://wannabe.kiiiosk.ru/api"',
  //'process.env.OPERATOR_API_URL': '"http://wannabe.kiiiosk.ru/operator/api"',
//}),
//new webpack.optimize.UglifyJsPlugin({
  //comments: false,
  //compressor: {
    //screw_ie8: true,
    //warnings: false,
  //},
//}),
////
