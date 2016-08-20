'use strict'

const crawlerData = require('./periodni.com/crawlerData')
const crawlerConfig = require('./request-promise_cheerio/generateConfig')(crawlerData)
const crawlerGeneric = require('./request-promise_cheerio/genericCrawler')(crawlerConfig)

crawlerGeneric
  .then(crawlerConfig.PROMISE_SUCCESS)
  .catch(crawlerConfig.PROMISE_ERROR)
