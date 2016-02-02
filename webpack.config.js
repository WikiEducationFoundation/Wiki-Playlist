var poststylus = require('poststylus');
var webpack = require('webpack');

module.exports = {
  entry: {
    polyfills: ['./app/react/utils/polyfills.js'],
    main: ['./app/react/index.js']
  },
  output: {
    path: __dirname + '/app/assets/javascripts',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        key: 'jsx',
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader']
      }
    ]
  },
  stylus: {
    use: [
      poststylus([ 'autoprefixer' ])
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.js.jsx', 'css', 'stylus']
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      _: 'lodash',
      Slider: 'react-slick',
      es6BindAll: 'es6bindall',
      slugify: 'slugify'
    })
  ]
};
