const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = options => ({
  mode: options.mode,
  entry: path.join(__dirname, '../src/prototype/index.js'),
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'static/prototype/js/[name].js?v=[hash:6]'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8196,
            outputPath: 'static/prototype/images/',
            name: '[name].[ext]?v=[hash:6]'
          }
        }]
      }
    ].concat(options.module ? options.module.rules)
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'prototype',
      template: path.join(__dirname, '../src/common/template/template.html'),
      minify: {
        collapseBooleanAttributes: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeEmptyAttributes: true
      },
      filename: 'html/prototype/index.html'
    }),
    new VueLoaderPlugin()
  ].concat(options.plugins),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      dist: path.resolve(__dirname, '../dist/')
    }
  },
  devServer: options.devServer || {},
  devtool: options.devtool,
  performance: options.performance || {}
})
