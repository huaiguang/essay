const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const PurifyCssWebpack = require('purifycss-webpack')
const glob = require('glob')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const isDev = process.env.NODE_ENV === 'development'
console.log('isDev', isDev)

module.exports = {
  entry: path.join(__dirname, '../src/prototype/index.js'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'prototype/js/[name].js?[hash:6]'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: [
          {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
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
        test: /\.(png|jpg|svg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8196,
            outputPath: 'images'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'prototype',
      template: path.join(__dirname, '../src/public/template.html'),
      minify: {
        collapseBooleanAttributes: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeEmptyAttributes: true
      },
      filename: 'prototype/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, 'src/*.vue'))
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
    　　filename: "prototype/css/[name].css?[hash:6]" // 提取出来的css文件路径以及命名
    })
  ],
  devServer: {
    contentBase: './dist',
    port: '8084',
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, // 不跳转
    hot: true // 热更新
  },
  devtool: 'source-map'
}
