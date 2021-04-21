const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/prototype/index.js'),
  output: {
    publicPath: '/', // 控制打包生成的html中引用外部资源的路径方式
    path: path.resolve(__dirname, '../dist'),
    filename:
      process.env.NODE_ENV === 'development' ?
        'static/prototype/js/[name].js?v=[hash:6]' :
        'static/prototype/js/[name].js?v=[contentHash:6]'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader:
              process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
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
            loader:
              process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
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
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8196,
              outputPath: 'static/prototype/images/',
              name:
                process.env.NODE_ENV === 'development' ?
                  '[name].[ext]?v=[hash:6]' :
                  '[name].[ext]?v=[contentHash:6]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new MiniCssExtractPlugin({
      filename: 'static/prototype/css/[name].css?v=[hash:6]' // 提取出来的css文件路径以及命名
    }),
    new HtmlWebpackPlugin({
      title: 'prototype',
      template: path.resolve(__dirname, '../public/template.html'),
      filename: 'html/prototype/index.html',
      minify: {
        collapseBooleanAttributes: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeEmptyAttributes: true
      }
    }),
    new webpack.HotModuleReplacementPlugin()
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
