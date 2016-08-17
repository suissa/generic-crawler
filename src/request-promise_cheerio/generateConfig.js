'use strict'

const crawlerFactory = require('./crawlerDataFactory')

module.exports = (crawlerData) => {
  crawlerFactory.setBASE_URL(crawlerData.BASE_URL)
  crawlerFactory.setElementList(crawlerData.elementList)
  crawlerFactory.setFieldValueType(crawlerData.fieldValueType)
  crawlerFactory.setFields(crawlerData.fields)
  crawlerFactory.setOptionsRequest(crawlerData.optionsRequest)
  crawlerFactory.setOptions(crawlerData.options)
  crawlerFactory.setPROMISE_SUCCESS(crawlerData.PROMISE_SUCCESS)
  crawlerFactory.setPROMISE_ERROR(crawlerData.PROMISE_ERROR)
  crawlerFactory.setcallback(crawlerData.callback)
  
  return crawlerFactory.getCrawler()
}