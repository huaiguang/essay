const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlProducer = require('./htmlProducer')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: path.join(__dirname, '../src/prototype/index.js'),
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist/'),
    filename: isDev ?
      'static/prototype/js/[name].js?v=[hash:6]' :
      'static/prototype/js/[name].js?v=[chunkHash:6]'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8196,
              outputPath: 'static/prototype/images/',
              name: isDev ? '[name].[ext]?v=[hash:6]' : '[name].[ext]?v=[contentHash:6]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/prototype/css/[name].css?v=[contentHash:6]'
    }),
    htmlProducer({
      title: 'prototype',
      templatePath: '../public/template.html',
      fileName: 'html/prototype/index.html'
    })
  ],
  devtool:
    process.env.NODE_ENV === 'development' ?
      'cheap-module-eval-source-map' :
      'cheap-module-source-map'
}
