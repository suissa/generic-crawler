'use strict'

const crawlerData = require('./decolar.com/crawlerData')
const crawlerConfig = require('./decolar.com/generateConfig')(crawlerData)
const crawlerGeneric = require('./request-promise_cheerio/genericCrawler')(crawlerConfig)

crawlerGeneric
  .then(crawlerConfig.PROMISE_SUCCESS)
  .catch(crawlerConfig.PROMISE_ERROR)
