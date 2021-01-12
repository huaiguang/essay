const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.base')
process.env.NODE_ENV = 'development'

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(true)
    }),
  ],
  devServer: {
    contentBase: './dist',
    port: '8084',
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, // 不跳转
    hot: true // 热更新
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },
})
