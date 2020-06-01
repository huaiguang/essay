const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const isDev = process.env.NODE_ENV === 'development'
const mode = isDev ? 'development' : 'production'
console.log('isDev', isDev, mode)

module.exports = {
  mode,
  entry: path.resolve(__dirname, '../src/prototype/index.js'),
  output: {
    publicPath: '/',  // 控制打包生成的html中引用外部资源的路径方式
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/prototype/js/[name].js?v=[hash:6]'
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
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'prototype',
      template: path.resolve(__dirname, '../src/public/template.html'),
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
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/prototype/css/[name].css?v=[hash:6]" // 提取出来的css文件路径以及命名
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist/'),
    port: '8084',
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, // 不跳转
    hot: true // 热更新
  },
  devtool: 'source-map'
}
