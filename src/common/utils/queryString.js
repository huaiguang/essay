// the handle of Qs

/**
 * [parse the Qs of location search]
 * @param  {[string]} name [to search variable]
 * @return void
 */
function getQueryStringByName(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  var r = window.location.search.substr(1).match(reg)
  var context = ""
  if (r != null) {
    context = r[2]
  }
  reg = null
  r = null
  return context == null || context == "" || context == "undefined" ? "" : context
}

export {
  getQueryStringByName
}
