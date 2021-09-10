const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { dateFormat } = require('../build/utils')
const isDev = process.env.NODE_ENV === 'development'

Date.prototype.toJSON = function() {
  return dateFormat(this, 'yyyy-MM-dd hh:mm:ss')
}

module.exports = options => ({
  mode: options.mode,
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
              outputPath: `static/${options.name}/${options.type}/images`,
              name: isDev ? '[name].[ext]?v=[hash:6]' : '[name].[ext]?v=[contentHash:6]'
            }
          }
        ]
      }
    ]
  },
  plugins: options.plugins.concat([
    new FriendlyErrorsWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(options.mode),
      builtDate: JSON.stringify(new Date())
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `static/${options.name}/${options.type}/css/[name].css?v=[contentHash:6]`
    })
  ]),
  devtool: isDev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  stats: 'errors-only'
})
