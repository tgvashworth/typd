var assign = require('object-assign');
var constants = require('./constants');
var baseConfig = require('./webpack.config');

module.exports = assign(baseConfig, {
  output: {
    filename: 'typd.js',
    library: 'Typd',
    libraryTarget: 'commonjs2',
    path: constants.BUILD_DIRECTORY
  }
});
