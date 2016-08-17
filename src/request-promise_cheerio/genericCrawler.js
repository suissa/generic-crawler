const rp = require('request-promise')

module.exports = (crawler) => {
  // Valores que irão para as funções internas
  // Agora todos encapsulados no objeto crawler
  // const BASE_URL = crawler.BASE_URL
  // const ElementList = crawler.elementList
  // const Fields = crawler.fields
  // const options = crawler.options
  // const callback = crawler.callback
  return rp(crawler.optionsRequest)
}
