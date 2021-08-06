const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlProducer = require('./htmlProducer')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const { dateFormat } = require('./utils')

Date.prototype.toJSON = function() {
  return dateFormat(this, 'yyyy-MM-dd hh:mm:ss')
}

module.exports = options => ({
  entry: options.entry,
  output: Object.assign(
    {
      publicPath: '/',
      path: path.join(__dirname, '../dist/')
    },
    options.output
  ),
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
              outputPath: `static/${options.src}/images/`,
              name: isDev ? '[name].[ext]?v=[hash:6]' : '[name].[ext]?v=[contentHash:6]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      builtDate: JSON.stringify(new Date())
    }),
    new MiniCssExtractPlugin({
      // filename: 'static/prototype/pc/css/[name].css?v=[contentHash:6]'
      filename: `static/${options.src}/css/[name].css?v=[contentHash:6]`
    }),
    htmlProducer({
      title: options.title,
      filename: `html/${options.route}/index.html`
    })
  ].concat(options.plugins),
  devtool:
    process.env.NODE_ENV === 'development' ?
      'cheap-module-eval-source-map' :
      'cheap-module-source-map',
  devServer: options.devServer,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  }
})
