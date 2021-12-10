require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.config.base')

const parse = require('minimist')
const argv = parse(process.argv.slice(2))
const src = argv._[0]
const route = src.split('/')[0]
const options = {
  src,
  route,
  entry: path.join(__dirname, `../src/${src}/index.js`),
  output: {
    filename: `static/${src}/js/[name].js?v=[hash:6]`
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': require('../config/prod.env')
    })
  ]
}
const webpackConfig = webpackBaseConfig(options)

webpackConfig.mode = 'production'

const spinner = ora('building for production...')

spinner.start()
rm(path.join(__dirname, `../dist/static/${src}/`), err => {
  if (err) {
    throw err
  }
  webpack(webpackConfig, (error, stats) => {
    spinner.stop()
    if (error) {
      throw error
    }
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      console.log(chalk.red('Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('Build complete.\n'))
  })
})
