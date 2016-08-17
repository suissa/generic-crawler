'use strict'

const request = require('request')
const cheerio = require('cheerio')

const crawlerData = require('./request-promise_cheerio/crawlerData')
const crawlerConfig = require('./request-promise_cheerio/generateConfig')(crawlerData)
// const crawlerGeneric = require('./request-promise_cheerio/genericCrawler')(crawlerConfig)

const crawlerGeneric = require('./request_cheerio/genericCrawler')(crawlerConfig)


// crawlerGeneric(crawlerConfig)
