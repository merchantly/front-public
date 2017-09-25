var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

module.exports = {...baseConfig,
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'build/scripts'),
      filename: '[name].js',
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
        'process.env.PUBLIC_API_URL': '"http://wannabe.3001.brandymint.ru/api"',
        'process.env.OPERATOR_API_URL': '"http://wannabe.vagrant.dev:3000/operator/api"',
        'process.env.IMAGES_PATH': '"../images"',
        'process.env.FONTS_PATH': '"../fonts"',
      }),
    ],
};
