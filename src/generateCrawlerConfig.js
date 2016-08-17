
const CrawlerFactory = require('./crawlerDataFactory')

module.exports = (CrawlerData) => {
  CrawlerFactory.setBASE_URL(CrawlerData.BASE_URL)
  CrawlerFactory.setElementList(CrawlerData.ElementList)
  CrawlerFactory.setFieldValueType(CrawlerData.FieldValueType)
  CrawlerFactory.setFields(CrawlerData.Fields)
  CrawlerFactory.setOptionsRequest(CrawlerData.optionsRequest)
  CrawlerFactory.setOptions(CrawlerData.options)
  CrawlerFactory.setPROMISE_SUCCESS(CrawlerData.PROMISE_SUCCESS)
  CrawlerFactory.setPROMISE_ERROR(CrawlerData.PROMISE_ERROR)
  CrawlerFactory.setcallback(CrawlerData.callback)

  return CrawlerFactory.getCrawler()
}