const webpack = require('webpack');
const config = require('./../../webpack.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

config.module.loaders.push({
  test: /\.styl$/, 
  loader: ExtractTextPlugin.extract("stylus", "css-loader!stylus-loader")
})

config.plugins.push(
  new ExtractTextPlugin("../stylesheets/[name].css", {allChunks: true}),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify("production")
    }
  })
)

module.exports = config;