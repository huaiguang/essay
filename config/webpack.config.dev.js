const webpack = require('webpack')

module.exports = require('./webpack.config.base')({
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    port: '8084',
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, // 不跳转
    hot: true // 热更新
  },
  devtool: 'cheap-module-eval-source-map'
})