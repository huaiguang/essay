// 引入全部的图片
// 理解require.context()
const allPng = {},
  context = require.context(
    '../../../../../assets/image/globalaccount/shop-detail/',
    false,
    /\.png/
  )

context.keys().forEach(key => {
  let route = key.split('-')[1]

  route = 'image' + route.substring(0, 1).toUpperCase() + route.substring(1)
  allPng[route.replace(/\.png/, '')] = context(key)
})
const { imageEurope, imageJapan, imageNorthamerica, imageUk, imagePaypal } = allPng
