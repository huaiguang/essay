// 大概永远也猜不到要处理的文件的形式；大部分情况下，需要为每个文件写解析方法

// 判断最后一行是否为空行
// 如果是，则删除最后一行
function handleFileLastLine(list) {
  if (!list[list.length - 1]) {
    list.pop()
  }
}

/**
 * parse text read to fields
 * @param {string} context
 * @returns Array
 */
export function parseFields(context) {
  const data = context.split(/\n/) // split to rows
  handleFileLastLine(data)
  const target = []

  data.forEach(item => {
    const splitItem = item.split(/\t/).filter(subItem => subItem !== '\t')
    const tempObj = {
      label: splitItem[0],
      value: splitItem[1]
    }

    target.push(tempObj)
  })
  return target
}

/**
 * parse text read to fields
 * @param {string} context
 * @returns Array
 */
export function parseEnum(context) {
  const data = context.split(/(\n|\t)/).filter(item => item !== '\n' && item !== '\t')
  const res = []
  let tempObj = {}
  data.forEach((item, index) => {
    if (index % 2 === 0) {
      tempObj.value = item
    } else {
      tempObj.label = item
      res.push(tempObj)
      tempObj = {}
    }
  })
  return res
}

/**
 * parse text read to banks
 * @param {string} context
 * @returns Array
 */
export function parseBankInfo(context) {
  const data = context.split(/\n/)
  const tempList = []

  data.forEach(item => {
    const splitItem = item.split(/\t/)
    const keyList = ['id', 'parentId', 'level', 'name', 'code']
    const tempObj = {}

    splitItem.forEach((subItem, subIndex) => {
      tempObj[keyList[subIndex]] = subItem
    })
    tempList.push(tempObj)
  })
  return tempList
}

/**
 * parse text read to cities
 * @param {string} context
 * @returns Array
 */
export function parseSiteInfo(context) {
  // 拆分所有的字段
  const data = context.split(/(\t|\n)/).filter(item => !['\t', '\n', ''].includes(item))
  // 组合成JSON格式
  const tempList = []
  const module = 4
  const keyList = ['name', 'code', 'abbr', 'clearNo']
  let tempObj = {}

  data.forEach((item, index) => {
    const moduleIndex = index % module

    tempObj[keyList[moduleIndex]] = item
    if (moduleIndex === 3) {
      tempList.push(tempObj)
      tempObj = {}
    }
  })
  return tempList
}

/**
 * parse text read to banks
 * @param {string} context
 * @returns Array
 */
export function parseAddrCode(context) {
  const data = context.split(/\n/).filter(item => item !== '\n')
  data.shift()
  const res = []
  let children = []
  data.forEach(item => {
    let tempArray = item.split(/\t/).filter(subItem => subItem !== '\t')
    if (tempArray.length > 2) {
      tempArray = tempArray.slice(0, 2)
    } else if (tempArray.length < 2) {
      return
    }

    const tempObj = {
      label: '',
      value: ''
    }
    if (tempArray[1].startsWith(' ')) {
      tempObj.label = tempArray[1].replace(/\s/g, '')
      tempObj.value = tempArray[0]
      children.push(tempObj)
    } else {
      children = []
      tempObj.label = tempArray[1]
      tempObj.value = tempArray[0]
      tempObj.children = children
      res.push(tempObj)
    }
  })
  return res
}
