const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = options => {
  return new HtmlWebpackPlugin({
    title: options.title,
    template: path.join(__dirname, options.templatePath),
    filename: options.fileName,
    minify: {
      collapseBooleanAttributes: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeEmptyAttributes: true
    }
  })
}
