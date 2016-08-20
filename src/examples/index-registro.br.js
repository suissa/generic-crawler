'use strict'

const crawlerData = require('./registro.br/crawlerData')
const crawlerConfig = require('./registro.br/generateConfig')(crawlerData)
const crawlerGeneric = require('./request-promise_cheerio/genericCrawler')(crawlerConfig)

crawlerGeneric
  .then(crawlerConfig.PROMISE_SUCCESS)
  .catch(crawlerConfig.PROMISE_ERROR)
