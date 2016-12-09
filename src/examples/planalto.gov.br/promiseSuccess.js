const removeThrash = (leis) => {
  delete leis.options
  delete leis.prevObject 
  delete leis._root
  return leis
}

module.exports = ($, crawler) => {
  let data = {
    leis: []
  }

  data.leis = crawler.fields.map( (element, index) => {
    if(element.valueType === 'js') return eval(element.value)
    if(element.valueType === 'css'){
      if(element.getType === 'text') 
        return $(element.value).map((i, el) => $(el).text())
      if(element.getType === 'html') return $(element.value).html()
    }
  })
  return crawler.callback(removeThrash(data.leis[0]))
}
