import rules from 'webpack/rules';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  plugins: [
    new MiniCssExtractPlugin()
  ],
  resolve: {
    modules: [
      path.join(__dirname, '../node_modules'),
    ],
    extensions: ['.js', '.jsx', '.json', '.coffee'],
  },
  module: {
    rules: rules
  },
};
