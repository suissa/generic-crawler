module.exports = ($, crawler) => {
  let data = {
    leis: []
  }
  console.log('crawler.fields: ', crawler.fields)
  crawler.fields.forEach( (element, index) => {
    if(element.valueType === 'js') data[element.name] = eval(element.value)
    if(element.valueType === 'css'){
      console.log('CSS', element.name, element.value)
      if(element.type === 'text') data[element.name] = $(element.value).text()
      if(element.type === 'html') data[element.name] = $(element.value).html()
      data['leis'].push($(element.value).text())
    }
  })
  console.log('data: ', data)
  return crawler.callback(data)
}

// (examples) ➜ (git:(master) ✗) ➜ node index-planalto.js 
// BASE_URL http://www.planalto.gov.br/ccivil_03/Leis/LEIS_2001/L10257.htm
// crawler.fields:  [ { name: 'lei', value: 'p', getType: 'text', valueType: 'css' } ]
// data:  {}
// Dados:  {}
