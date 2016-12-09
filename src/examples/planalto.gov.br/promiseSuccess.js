const removeThrash = (leis) => {
  let _leis = Object.assign({}, leis)
  delete _leis.options
  delete _leis.prevObject 
  delete _leis._root
  return _leis
}

module.exports = ($, crawler) => {
  let data = {
    leis: []
  }

  const getByJS = (element) => eval(element.value)
  const getText = (element) => $(element.value).map((i, el) => $(el).text())
  const getHTML = (element) => $(element.value).html()
  const getByCSS = (element) => (element.getType === 'text') 
                                  ? getText(element)
                                  : getHTML(element)

  let _leis = crawler.fields.map( (element, index) => 
    (element.valueType === 'js') 
      ? getByJS(element) 
      : getByCSS(element)
  )
  data.leis = removeThrash(_leis[0])
 console.log('data', data)
  return crawler.callback(data)
}
