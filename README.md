# Essay

记录想到的点点滴滴

## Structure

```
|-- code
    |-- .DS_Store
    |-- .editorconfig
    |-- .eslintignore
    |-- .eslintrc.js
    |-- .gitignore
    |-- .npmrc
    |-- .prettierrc.js
    |-- LICENSE
    |-- README.md
    |-- babel.config.js
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js
    |-- .husky
    |   |-- .gitignore
    |   |-- pre-commit
    |   |-- _
    |       |-- husky.sh
    |-- build
    |   |-- build.js
    |   |-- check-versions.js
    |   |-- htmlProducer.js
    |   |-- utils.js
    |   |-- webpack.config.base.js
    |   |-- webpack.config.dev.js
    |   |-- webpack.config.js
    |-- config
    |   |-- dev.env.js
    |   |-- index.js
    |   |-- prod.env.js
    |-- layout
    |   |-- h5.html
    |   |-- jump.js
    |   |-- pc.html
    |-- scripts
    |   |-- index.js
    |   |-- webpack.config.js
    |-- src/
    |-- dist/
```

## CMD Table

| cmd            | content                                                 | description                                     |
| -------------- | ------------------------------------------------------- | ----------------------------------------------- |
| lint           | eslint src/ --ext .js,.vue --quiet                      | 使用 eslint 校验 src/下的 js 和 vue 文件        |
| lint:fix       | eslint src/ --ext .js,.vue --quiet --fix                | 使用 eslint 自动修复 warning 和 error           |
| prettier:check | prettier --check \"src/\*_/_.{vue,js,css}\"             | 使用 prettier 检查 src/的 vue,js,css 文件的风格 |
| prettier:write | prettier --write \"src/\*_/_.{vue,js,css}\"             | 使用 prettier 格式化 src/的 vue,js,css 文件     |
| prepare        | husky install                                           | 安装 husky                                      |
| precommit      | lint-stage                                              | 添加 commit 前的预检查操作                      |
| webpack:test   | webpack --config build/webpack.config.js                | 测试 webpack 的配置                             |
| dev            | webpack-dev-server --config build/webpack.config.dev.js | 采用 webpackDevServer 来实现项目的热更新        |
| build          | node build/build.js                                     | 通过 node 脚本和 webpack 函数来启动打包服务     |
| build:stats    | node build/build.js --json > stats.json                 | 输出打包的记录文件                              |

其中，增加了通过 node 脚本启动 webpack 的两个命令

```javascript
// scripts/index.js
node scripts/index.js --mode watch --src antd/pc
node scripts/index.js --mode build --src antd/pc
// http://localhost:8011/html/antd/index.html
```
