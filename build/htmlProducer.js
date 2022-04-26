const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const whichTemplate = type => {
  let templatePath = ''

  switch (type) {
    case 'pc':
      templatePath = path.join(__dirname, '../layout/pc.html')
      break
    case 'h5':
      templatePath = path.join(__dirname, '../layout/h5.html')
      break
    // no default
  }
  return templatePath
}

module.exports = options => {
  return new HtmlWebpackPlugin({
    title: options.title,
    template: whichTemplate((options.type = 'pc')),
    filename: options.filename,
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
