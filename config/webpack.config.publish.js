var webpack = require('webpack');
var assign = require('object-assign');
var constants = require('./constants');
var baseConfig = require('./webpack.config');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = assign(baseConfig, {
  output: {
    filename: 'typd.js',
    library: 'Typd',
    libraryTarget: 'commonjs2',
    path: constants.BUILD_DIRECTORY
  },
  plugins: baseConfig.plugins.concat([
    new UglifyJsPlugin({
      compress: {
        dead_code: true,
        drop_console: true,
        screw_ie8: true,
        warnings: true
      }
    })
  ])
});
