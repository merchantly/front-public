// Build the bundle used for prerender react on rails
//
import path from 'path';
import merge from 'webpack-merge';
import baseConfig from './webpack/base';

const nodeConfig = {
  entry: {
    store_app_prerender: path.join(__dirname, 'app/scripts/store_app_prerender'),
  },
  target: 'node',
  resolve: {
    alias: {
      'reqwest': path.join(__dirname, 'webpack/noop.js')
    }
  }
}

exports.default = [
  merge(baseConfig, nodeConfig, { mode: 'production', output: { filename: '[name].production.js' } }),
  merge(baseConfig, nodeConfig, { mode: 'development', output: { filename: '[name].development.js' } }),
]
