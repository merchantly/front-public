import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import babelifyOptions from './.babelrc.js';

const devMode = process.env.NODE_ENV !== 'production';

console.log('webpack devMode', devMode);

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
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: [
      {loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'images/',
        filename: '[path][name].[ext]'
      }}
    ]
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/',
        filename: '[path][name].[ext]'
      }
    }]
  },
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
    test: /\.(sass|s?css)$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader', options: { importLoaders: 1 }
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [
              path.resolve(__dirname, './app/stylesheets'),
              path.resolve(__dirname, './node_modules/@bower_components'),
              path.resolve(__dirname, './node_modules'),
          ]
        }
      },
    ],
    exclude: /(node_modules|bower_components)/,
  },
  {
    test: /\.pug$/,
    use: 'pug-loader'
  },
  //{
    //test: /\.json$/,
    //use: [
      //{ loader: 'json-loader' }
    //]
  //},
];

const baseConfig = {
  output: {
    filename: '[name].js'
  },
  module: {
    rules: rules,
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'node_modules/@bower_components'),
    ],
    extensions: ['.js', '.jsx', '.json', '.coffee'],
  },
};

const nodeConfig = {
  entry: {
    store_app_node: path.join(__dirname, 'app/scripts/store_app_prerender'),
    tests: path.join(__dirname, 'test/index')
  },
  target: 'node'
}

const browserConfig = {
  devtool: 'inline-source-map',
  entry: {
    widget: path.join(__dirname, 'app/scripts/widget'),
    store_app: path.join(__dirname, 'app/scripts/store_app'),
    styles: path.join(__dirname, 'app/stylesheets/production.scss'),

    // Uses for development
    store_app_dev: path.join(__dirname, 'app/scripts/store_app_dev'),
    libs: path.join(__dirname, 'app/scripts/libs'), // ex vendor
    fonts: path.join(__dirname, 'app/fonts'),
    images: path.join(__dirname, 'app/images')
  },
  target: 'web',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}

exports.default = [ merge(baseConfig, nodeConfig), merge(baseConfig, browserConfig)]
