const webpack = require('webpack');
const config = require('./../../webpack.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

config.plugins.push(
  new ExtractTextPlugin("../stylesheets/[name].css", {allChunks: true}),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify("production")
    }
  })
)

module.exports = config;