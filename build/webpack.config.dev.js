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
      // 'process.env': require('../config/dev.env'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  devServer: {
    // webpack-dev-server 输出的文件只存在于内存中
    // 指定服务器资源的根目录. 如果不写入contentBase的值, 那么contentBase默认是项目的目录.
    contentBase: './dist',
    // 开启服务的端口号, 默认端口号为8080
    port: '8011',
    // 服务器的主机号. 设置为 0.0.0.0, 则可以通过广播在同一网段上相互访问.
    host: '0.0.0.0',
    // 用来配置在编译出错的时候，在浏览器页面上显示错误，默认为false，不显示
    overlay: false,
    // 用来控制编译的时候shell上的输出内容, 主要有一下选择
    // "minimal"，"normal"，"verbose"
    stats: 'errors-only',
    // 当它被设置为true的时候，控制台只输出第一次编译的信息，当你保存后再次编译的时候不会输出任何内容，包括错误和警告
    quiet: false,
    // 当它被设置为true的时候对所有的服务器资源采用gzip压缩
    // 优点：对JS，CSS资源的压缩率很高，可以极大得提高文件传输的速率，从而提升web性能
    // 缺点：服务端要对文件进行压缩，而客户端要进行解压，增加了两边的负载
    compress: true,
    // 配置属性是用来应对返回404页面时定向到特定页面用的
    // historyApiFallback: true, // 不跳转
    historyApiFallback: {
      rewrites: [{ from: /./, to: '404.html' }]
    },
    // *** core *** 自动刷新和模块热替换
    // 有两种mode可实现自动刷新和热模块替换机制
    // 1. iframe mode(默认,无需配置) 页面被嵌入在一个iframe里面，并且在模块变化的时候重载页面
    // 2. inline mode(需配置)       添加到bundle.js中 当刷新页面的时候，一个小型的客户端被添加到webpack.config.js的入口文件中
    // inline mode 相当于入口文件增加了 'webpack-dev-server/client?http://localhost:8080/'
    // 热更新
    hot: true,
    // 文件修改后实时刷新
    inline: true
  },
  ...options
})

module.exports = config
