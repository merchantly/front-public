import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import babelifyOptions from '../.babelrc.js';

exports.default = [
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
    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
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
            path.resolve(__dirname, '../app/stylesheets'),
            path.resolve(__dirname, '../node_modules/@bower_components'),
            path.resolve(__dirname, '../node_modules'),
          ]
        }
      },
    ],
    exclude: /(node_modules|bower_components)/,
  },
  {
    test: /\.html$/,
    use: [
      { loader: 'file-loader', options: { name: '[path][name].html' } },
      { loader: 'extract-loader' },
      { loader: 'html-loader', options: { attrs: ['img:src', 'link:href'] } },
    ]
  },
  {
    test: /\.pug$/,
    use: [
      { loader: 'file-loader', options: { name: '[path][name].html' } },
      'extract-loader',
      { loader: 'html-loader', options: { attrs: ['img:src', 'link:href'] } },
      'pug-html-loader'
    ]
  }
];
