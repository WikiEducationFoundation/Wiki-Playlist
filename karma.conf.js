var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha', 'sinon'],
    files: ['config/webpack/tests.config.js'],
    preprocessors: {
      'config/webpack/tests.config.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    webpack: {
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }]
      },
      watch: true,
      resolve: {
        extensions: ["", ".js", ".jsx", ".js.jsx"]
      },
      devtool: 'inline-source-map',
      plugins: [
        new webpack.ProvidePlugin({
          React: 'react',
          ReactDOM: 'react-dom',
          _: 'lodash'
        })
      ]
    },
    webpackServer: {
      noInfo: true
    }
  });
};
