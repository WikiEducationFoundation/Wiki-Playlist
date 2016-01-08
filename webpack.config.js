var poststylus = require('poststylus');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: ['./app/react/index.js']
  },
  output: {
    path: __dirname + '/app/assets/javascripts',
    filename: 'react_bundle.js'
  },
  module: {
    loaders: [
      {
        key: 'jsx',
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader']
      },
      {
        key: 'css',
        test: /\.css$/,
        loader: "style-loader!css-loader"
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
      es6BindAll: 'es6bindall'
    })
  ]
};
