module.exports = (ctx) => ({
  ident: 'postcss',
  parser: 'postcss-scss',
  plugins: [
    ctx.env === 'production' ? require('cssnano') : false
  ],
  minimize: true
})
