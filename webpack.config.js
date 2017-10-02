const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const libs = [
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'prop-types',
  'styled-components',
  'polished',
  'rxjs',
  'symbol-observable',
];
const libsEntry = {};

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    names: libs,
    filename: '[name].js',
    minChunks: Infinity,
  }),
  new HtmlWebpackPlugin({
    template: path.join(process.cwd(), 'app/index.html'),
    inject: true,
  }),
];

libs.forEach((lib) => {
  libsEntry[lib] = lib;
});

const entry = {
  app: [
    'react-hot-loader/patch',
    path.join(process.cwd(), 'app/app.js'),
  ],
  /*
   * Fix: node v8+ keepAliveTimeout after 5s (#13391)
   */
  ...libsEntry,
};

module.exports = {
  entry,
  output: {
    path: path.resolve(process.cwd(), 'build'),
    filename: '[name].js',
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
    historyApiFallback: true,
    compress: true,
  },
};

