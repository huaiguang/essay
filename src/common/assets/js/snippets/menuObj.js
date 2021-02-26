/**
 * 将菜单对象转化为数组结构，以接入树结构
 * @param  {object} menusObj 定义的菜单对象
 * @return {array}          树结构数组
 */
function transformTreeMenu(menusObj) {
  const list = []

  for (let key in menusObj) {
    if (menusObj[key]) {
      const tempObj = ergodic(menusObj[key])

      list.push(tempObj)
    }
  }
  return list

  function ergodic(obj) {
    if (obj.hasOwnProperty('submenus') && Object.keys(obj.submenus).length > 0) {
      if (obj.children === undefined) {
        obj.children = []
      }
      for (let key in obj.submenus) {
        obj.children.push(obj.submenus[key])
        ergodic(obj.submenus[key])
      }
    }
    return obj
  }
}
