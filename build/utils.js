const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function(_path) {
  const assetsDirectory =
    process.env.NODE_ENV === 'production' ?
      config.build.assetsDirectory :
      config.dev.assetsDirectory

  return path.posix.join(assetsDirectory, _path)
}

exports.cssLoaders = function(options = {}) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      SourceMap: options.SourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    if (options.extract) {
      return MiniCssExtractPlugin.loader
    }
    return ['vue-style-loader'].concat(loaders)
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass').concat({
      loader: 'sass-resources-loader',
      options: {
        resources: path.resolve(__dirname, '../src/assets/css/resources/*.scss')
      }
    }),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]

    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') {
      return
    }

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

/**
 * 正则分组捕获
 * 正则匹配时，默认是贪婪模式
 */
const SIGN_REGEXP = /([yMdhms])(\1*)/g,
  // 默认的时间格式
  DEFAULT_PATTERN = 'yyyy-MM-dd'

/**
 * 补全日期中单个时间前面的0，例如一月 '01'
 * @param  {[string]} s   [the string to deal]
 * @param  {[number]} len [the reserved length]
 * @return {[string]}     [add extra 0 to the left of the s]
 */
function padding(s, len) {
  var newStr = String(s),
    newLen = len - newStr.length

  for (var i = 0; i < newLen; i++) {
    newStr = '0' + s
  }
  return newStr
}

/**
 * format the date string by the pattern
 * @param {date} date
 * @param {string} pattern the required format date string, as 'yyyy-MM-dd hh:mm:ss'
 * @return {string}
 */
function dateFormat(date = new Date(), pattern = DEFAULT_PATTERN) {
  return pattern.replace(SIGN_REGEXP, function($0) {
    switch ($0.charAt(0)) {
      case 'y':
        return padding(date.getFullYear(), $0.length)
      case 'M':
        return padding(date.getMonth() + 1, $0.length)
      case 'd':
        return padding(date.getDate(), $0.length)
      case 'h':
        return padding(date.getHours(), $0.length)
      case 'm':
        return padding(date.getMinutes(), $0.length)
      case 's':
        return padding(date.getSeconds(), $0.length)
      // no default
    }
  })
}

exports.dateFormat = dateFormat
