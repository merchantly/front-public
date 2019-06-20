import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import rules from 'webpack/rules';
import { env, isDevMode } from 'webpack/base';

import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

const baseConfig = {
  output: {
    filename: `[name].${env}.js`
  },
  module: {
    rules: rules,
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'node_modules/@bower_components'),
    ],
    extensions: ['.js', '.jsx', '.json', '.coffee', '.pug'],
  },
  plugins: [
    new LodashModuleReplacementPlugin,
    new BundleAnalyzerPlugin({ analyzerMode: 'static' })
  ]
};

const nodeConfig = {
  entry: {
    store_app_prerender: path.join(__dirname, 'app/scripts/store_app_prerender'),
  },
  target: 'node',
  optimization: {
    minimize: !isDevMode
  }
}

const browserConfig = {
  devtool: isDevMode ? 'inline-source-map' : false,
  entry: {
    widget: path.join(__dirname, 'app/scripts/widget'),
    store_app: path.join(__dirname, 'app/scripts/store_app'),
    store_app_styles: path.join(__dirname, 'app/stylesheets/production.scss'),
    libs: path.join(__dirname, 'app/scripts/libs'), // ex vendor
    fonts: path.join(__dirname, 'app/fonts'),
    images: path.join(__dirname, 'app/images'),

    // Uses for local development
    store_app_dev: path.join(__dirname, 'app/scripts/store_app_dev'),
  },
  target: 'web',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

const devConfig = {
  mode: 'production',
  module: {
    rules: rules,
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'node_modules/@bower_components'),
    ],
    extensions: ['.js', '.jsx', '.json', '.coffee', '.pug'],
  },
  entry: {
    // index: path.join(__dirname, 'html'),
    www: path.join(__dirname, 'html/widget')
  },
  target: 'web',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
}

exports.default = [
  merge(baseConfig, nodeConfig),
  merge(baseConfig, browserConfig),
  // devConfig
]
