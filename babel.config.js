// babel.config.js

module.exports = api => {
  return {
    plugins: [
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-class-properties'
      // ant-design-vue 按需加载配置
      // [
      //   'import',
      //   {
      //     libraryName: 'ant-design-vue',
      //     libraryDirectory: 'es',
      //     style: 'css'
      //   }
      // ]
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          // caller.target will be the same as the target option from webpack
          targets: api.caller(caller => caller && caller.target === 'node') ?
            { node: 'current' } :
            { chrome: '58', ie: '11' }
        }
      ]
    ]
  }
}
