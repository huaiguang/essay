const path = require('path')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.config.base')
// const parse = require('minimist')

// const argv = parse(process.argv.slice(2))
// const src = argv._[0]
// const route = src.split('/')[0]
const src = 'prototype/pc'
const route = 'prototype'
const options = {
  src,
  route,
  entry: path.join(__dirname, `../src/${src}/index.js`),
  output: {
    filename: `static/${src}/js/[name].js?v=[hash:6]`
  }
}

process.env.NODE_ENV = 'development'

const config = webpackBaseConfig({
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(true)
    })
  ],
  devServer: {
    contentBase: './dist',
    port: '8011',
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, // 不跳转
    hot: true // 热更新
  },
  ...options
})

console.log(config)
module.exports = config
