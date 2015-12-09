var webpack = require('webpack');

var DedupePlugin = webpack.optimize.DedupePlugin;
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;

var plugins = [
  new DedupePlugin(),
  new OccurenceOrderPlugin()
];

module.exports = {
  entry: './src',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    path: './dist',
    filename: 'typd.js'
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  },
  plugins: plugins
};
