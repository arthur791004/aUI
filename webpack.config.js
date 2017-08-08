const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(process.cwd(), 'app/index.html'),
    inject: true,
  }),
];

module.exports = {
  entry: [
    'eventsource-polyfill', // Necessary hot reloading with IE
    'react-hot-loader/patch',
    path.join(process.cwd(), 'app/app.js'),
  ],
  output: {
    path: path.resolve(process.cwd(), 'build'),
    filename:'[name].js',
    chunkFilename: '[name].chunk.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }],
  },
  plugins,
  resolve: {
  },
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false,
  },
  devServer: {
    port: '8080',
    contentBase: './build',
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
  },
};

