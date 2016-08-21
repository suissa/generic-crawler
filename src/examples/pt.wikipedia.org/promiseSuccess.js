module.exports = ($, crawler) => {
  let data = {}
  crawler.fields.forEach(function (element, index) {
    if(element.valueType === 'js') data[element.name] = eval(element.value)
    if(element.valueType === 'css'){
      if(element.type === 'text') data[element.name] = $(element.value).text()
       if(element.type === 'html') data[element.name] = $(element.value).html()
    }
  })
  console.log('data: ', data)
  return crawler.callback(data)
}
