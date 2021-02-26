function addEventsByName(list) {
  list.forEach(item => {
    if (item.name === 'nameZh' || item.name === 'nameEn' || item.name === 'addr') {
      item.inputFun = () => {
        let itemVal = this.realNameForm[item.name]

        if (itemVal && itemVal.length > 0) {
          this.realNameForm[item.name] = itemVal.replace(reg.regMoji, '')
        }
      },
      item.blurFun = () => {
        let itemVal = this.realNameForm[item.name]

        if (itemVal && itemVal.length > 0) {
          this.realNameForm[item.name] = itemVal.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ')
        }
      }
    }
  })
}
