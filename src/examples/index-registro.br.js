'use strict'

const SITE = 'registro.br'
const CRAWLER = 'request-promise_cheerio'

const crawlerData = require('./' + SITE + '/crawlerData')
const crawlerConfig = require('./'+ CRAWLER +'/generateConfig')(crawlerData)
const crawlerGeneric = require('./'+ CRAWLER +'/genericCrawler')(crawlerConfig)

crawlerGeneric
  .then(crawlerConfig.PROMISE_SUCCESS)
  .catch(crawlerConfig.PROMISE_ERROR)
