'use strict'

const SITE = 'pt.wikipedia.org'
const CRAWLER = 'request-promise_cheerio'

const crawlerData = require('./' + SITE + '/crawlerData')
const crawlerConfig = require('./' + CRAWLER + '/generateConfig')(crawlerData)
const genericCrawler = require('./' + CRAWLER + '/genericCrawler')(crawlerConfig)

genericCrawler
  .then(crawlerConfig.PROMISE_SUCCESS)
  .catch(crawlerConfig.PROMISE_ERROR)