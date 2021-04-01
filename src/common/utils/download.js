/**
 * [download file by element A]
 * @param  {[string]} options.url  [the url of target file]
 * @param  {[name] options.name }   [the name of download file]
 * @return void
 */
function downloadByElemA({ url, name } = {}) {
  const elemA = document.createElement('a')

  elemA.href = url
  elemA.download = name
  document.body.appendChild(elemA)
  elemA.click()
  document.body.removeChild(elemA)
}

/**
 * download file by url
 * @param  {[string]} url [the url of file]
 * @param  {[string]} fileName [the name of file]
 * @return {[void]}     [description]
 */
function savePic(url, fileName) {
  const img = new Image(),
    canvas = document.createElement('canvas')

  img.onload = function() {
    // this 指向 img 对象，如下：
    // <img crossorigin="Anonymous" src="https://www.baidu.com/img/PCdoodle_dce011f4f164006d915e4e122012c428.png">
    console.log('inner', this)
    canvas.width = this.width
    canvas.height = this.height
    const context = canvas.getContext('2d')

    context.drawImage(this, 0, 0)

    downloadByElemA({
      url: canvas.toDataURL('image/png'),
      name: fileName
    })
  }
  img.crossOrigin = 'Anonymous'
  img.src = url
}

/**
 * [download image file by canvas]
 * @param  {[string]} img  [the selector of target image]
 * @param  {[string]} name [the name of the download image]
 * @return void
 */
function downLocalImage(img, name) {
  const canvas = document.createElement('canvas')

  canvas.width = img.width
  canvas.height = img.height
  const context = canvas.getContext('2d')

  context.drawImage(img, 0, 0, img.width, img.height)
  downloadByElemA({
    url: canvas.toDataURL('image/png'),
    name: name
  })
}

/**
 * [download blob file]
 * @param  {[data]} data [the blob data of the target file]
 * @param  {[name]} name [the name of the download file]
 * @return void
 */
function saveAs(data, name) {
  var urlObject = window.URL || window.webkitURL || window,
    export_blob = new Blob([data])
  // download the file

  downloadByElemA({
    url: urlObject.createObjectURL(export_blob),
    name: name
  })
}
