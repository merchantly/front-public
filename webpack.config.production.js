var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');
var config = Object.create(baseConfig);

config.output = {
  path: 'dist/scripts',
  filename: '[name].js',
};
config.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
    'process.env.PUBLIC_API_URL': '"http://wannabe.kiiiosk.ru/api"',
    'process.env.OPERATOR_API_URL': '"http://wannabe.kiiiosk.ru/operator/api"',
  }),
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compressor: {
      screw_ie8: true,
      warnings: false,
    },
  }),
];

module.exports = config;
