module.exports = ($, crawler) => {
  let data = {
    leis: []
  }
  // console.log('crawler.fields: ', crawler.fields)
 let leis = crawler.fields.map( (element, index) => {
    if(element.valueType === 'js') return eval(element.value)
    if(element.valueType === 'css'){
      // console.log('CSS', element.getType, element.name, element.value)
      if(element.getType === 'text') {
        $(element.value).each((i, el) => data.leis.push($(el).text()))
      }
      if(element.getType === 'html') return $(element.value).html()
    }
  })
  // data.leis = leis
  // console.log('data', data)
  return crawler.callback(data)
}
