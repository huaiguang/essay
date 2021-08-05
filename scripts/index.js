const path = require('path')
const parse = require('minimist')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const htmlProducer = require('../build/htmlProducer')
const createWebpackConfig = require('./webpack.config')
const rm = require('rimraf')

const argv = process.argv.slice(2)
const argvObj = parse(argv)
const { src, mode } = argvObj

// validate
if (!src || !mode) {
  console.log(chalk.red('--help\n --src 文件源\n --mode 运行模式'))
  process.exit(1)
}

// 项目名只能包含字母, 数字, _, -
const regSrc = /^\/?[\w-]+\/(pc|h5)$/

if (!regSrc.test(src)) {
  console.log(chalk.red('项目路径错误\n --src 文件源格式为 xxx/pc 或者 xxx/h5'))
  process.exit(1)
}

// 目前只支持build, watch模式
const modeList = ['build', 'watch']
const modeString = modeList.join(', ')

if (!modeList.includes(mode)) {
  console.log(chalk.red('mode错误\n --model 运行模式只能是' + modeString))
  process.exit(1)
}

const projectInfo = src.split('/')
// 当为pc时, html中不要设置pc层，h5类型时需要添加h5文件夹
// 静态资源都需要添加pc/h5层级
const route = projectInfo[1] === 'pc' ? projectInfo[0] : src
const buildOpts = {
  name: projectInfo[0],
  type: projectInfo[1],
  mode: mode === 'build' ? 'production' : 'development',
  entry: path.join(__dirname, `../src/${src}/index.js`),
  output: {
    filename:
      mode === 'build' ?
        `static/${src}/js/[name].js?v=[contentHash:6]` :
        `static/${src}/js/[name].js?v=[hash:6]`
  },
  plugins: [
    htmlProducer({
      title: 'prototype',
      filename: `html/${route}/index.html`
    })
  ]
}

const webpackConfig = createWebpackConfig(buildOpts)

if (mode === 'build') {
  console.log(chalk.white('in build mode'))
  // 构建流程
  rm(path.join(__dirname, `../dist/static/${src}`), err => {
    if (err) {
      console.log(chalk.red('删除错误'))
    }

    webpack(webpackConfig, (error, stats) => {
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

      const info = stats.toJson()

      // 处理代码编辑中产生的error
      if (stats.hasErrors() && info.errors.length > 0) {
        console.log(chalk.red('errors.\n'), info.errors)
        process.exit(1)
      }

      // 处理代码编译中产生的warning
      if (stats.hasWarnings()) {
        console.log(chalk.yellow('warning.\n'), info.warning)
      }

      console.log(chalk.cyan('Build complete.\n'))
    })
  })
} else {
  console.log(chalk.white('in watch mode'))
  // watch 开发流程
  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(compiler, {
    contentBase: './dist',
    port: '8011',
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, // 不跳转
    hot: true // 热更新
  })

  server.listen(8011)
}
