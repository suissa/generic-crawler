module.exports = ($, crawler) => {
  console.log('$(#firstHeading): ', $('#firstHeading').text())
  console.log('fields', crawler.fields)

  let obj = {}
  crawler.fields.forEach(function (element, index) {
    // if is type CSS
    obj[element.name] = $(element.value).text()
  })
  console.log('OBJ: ', obj)
// $(crawler.elementList).each(function(i, element){
//   const data = $(crawler.elementList +' span[data-ng-show=true] .row pre').text()
//   console.log('data', data)
//   return data
// })
}
