const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = require('./webpack.config.base')({
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
    　　filename: "/static/prototype/css/[name].css?v=[hash:6]" // 提取出来的css文件路径以及命名
    })
  ],
  devtool: 'cheap-module-source-map'
})