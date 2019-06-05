// Used to local development with webpack-dev-server

import path from 'path';
import merge from 'webpack-merge';
import baseConfig from './webpack/base';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = {
  devServer: {
    port: process.env.DEV_SERVER_PORT || 9000,
    // contentBase: path.join(__dirname, 'dist'),
    disableHostCheck: true,
    hot: true
  },
  devtool: 'eval',
  mode: 'development',
  entry: {
    widget: path.join(__dirname, 'app/scripts/widget'),
    //store_app: path.join(__dirname, 'app/scripts/store_app'),
    //store_app_styles: path.join(__dirname, 'app/stylesheets/production.scss'),
    //libs: path.join(__dirname, 'app/scripts/libs'), // ex vendor
    //fonts: path.join(__dirname, 'app/fonts'),
    //images: path.join(__dirname, 'app/images'),
    index: path.join(__dirname, 'www'),
    test: path.join(__dirname, 'test'),
    // store_app_dev: path.join(__dirname, 'app/scripts/store_app_dev'),
  },
  target: 'web',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    //new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/www/'
  }
}

exports.default = merge(baseConfig, config);
