var path = require('path');

module.exports = {
  entry: './app/scripts/react/components/Widget/index.jsx',
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'app/bower_components'),
    ],
    alias: {
      'fancybox': 'fancybox/source/jquery.fancybox',
      'fancybox.wannabe': 'fancybox-wannabe-fix/index',
      'bootstrapSass': 'bootstrap-sass-official/assets/javascripts/bootstrap',
      'jquery': 'jquery/dist/jquery',
      'owlCarousel': 'OwlCarousel/owl-carousel/owl.carousel',
      'jquery.mmenu': 'jQuery.mmenu/src/js/jquery.mmenu.min.all',
      'jquery.role': 'jquery.role/lib/jquery.role',
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
        exclude: /(node_modules|bower_components)/,
      },
      //{
        //test: /\.json$/,
        //loader: 'json-loader',
      //},
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
};
