function displayVersionInfo() {
  const versionInfoList = [
    {
      title: 'environment',
      content: process.env.NODE_ENV,
      backgroundColor: '#42c02e'
    },
    {
      title: 'version',
      content: '1.0.0',
      backgroundColor: '#1475b2'
    },
    {
      title: 'built date ',
      content: builtDate,
      backgroundColor: '#1475b2'
    }
  ]

  function output(e) {
    const t = e.title,
      c = e.content,
      n = e.backgroundColor,
      a = [
        '%c '.concat(t, ' %c ').concat(c, ' '),
        'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: '.concat(
          '#606060',
          ';'
        ),
        'padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: '.concat(n, ';')
      ]
    // return function() {
    //   let e
    //   window.console && typeof window.console.log === 'function' && (e = console).log.apply(e, arguments)
    // }
    //   .apply(void 0, a)
    // console.log.apply(null, a)

    console.log(...a)
  }
  versionInfoList.forEach(output)
}

export { displayVersionInfo }
