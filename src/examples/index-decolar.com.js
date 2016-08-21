'use strict'

const SITE = 'decolar.com'
const CRAWLER = 'request-promise_cheerio'

const crawlerData = require('./' + SITE + '/crawlerData')
const crawlerConfig = require('./'+ CRAWLER +'/generateConfig')(crawlerData)
const crawlerGeneric = require('./'+ CRAWLER +'/genericCrawler')(crawlerConfig)

crawlerGeneric
  .then(crawlerConfig.PROMISE_SUCCESS)
  .catch(crawlerConfig.PROMISE_ERROR)
