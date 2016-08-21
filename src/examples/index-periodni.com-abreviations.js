'use strict'

const SITE = 'periodni.com'
const CRAWLER = 'request-promise_cheerio'
const crawlerData = require('./'+ SITE +'/crawlerDataAbreviations')
const crawlerConfig = require('./'+ CRAWLER +'/generateConfig')(crawlerData)
const crawlerGeneric = require('./request-promise_cheerio/genericCrawler')(crawlerConfig)

crawlerGeneric
  .then(crawlerConfig.PROMISE_SUCCESS)
  .catch(crawlerConfig.PROMISE_ERROR)
