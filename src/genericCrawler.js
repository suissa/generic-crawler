const rp = require('request-promise');
const cheerio = require('cheerio')

module.exports = (Crawler) => {
  // Valores que irão para as funções internas
  // Agora todos encapsulados no objeto Crawler
  const BASE_URL = Crawler.BASE_URL
  const ElementList = Crawler.ElementList
  const Fields = Crawler.Fields
  const options = Crawler.options
  const callback = Crawler.callback

  return rp(Crawler.optionsRequest)
}
