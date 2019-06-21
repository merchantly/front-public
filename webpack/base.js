import path from 'path';

import rules from './rules';

export const isDevMode = process.env.NODE_ENV !== 'production';
export const env = isDevMode ? 'development' : 'production';

console.log('webpack isDevMode', isDevMode);

exports.default = {
  //output: {
    //filename: `[name].${env}.js`
  //},
  module: {
    rules: rules,
  },
  resolve: {
    modules: [
      path.join(__dirname, '../node_modules'),
      path.join(__dirname, '../node_modules/@bower_components'),
    ],
    extensions: ['.js', '.jsx', '.json', '.coffee', '.pug', '.html'],
  },
};
