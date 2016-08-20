'use strict'

const cheerio = require('cheerio')
const BASE_URL = 'http://www.decolar.com/shop/flights/results/roundtrip/CWB/SAO/2016-09-20/2016-09-22/1/0/0?from=SB'
const crawler = {
  BASE_URL: BASE_URL,
  elementList: '.itineraries',
  fieldValueType: 'css',
  fields: [
    {
      name: 'voos',
      value: '.itineraries-container'
    }
  ],
  optionsRequest: {
    uri: BASE_URL,
    transform: function (body) {
      return cheerio.load(body)
    }
  },
  PROMISE_SUCCESS: ($) => {
    console.log('PROMISE_SUCCESS')
    return require('./promiseSuccess')($, crawler)
  },
  PROMISE_ERROR: (err) => {
    throw new Error(err)
  },
  options: {
  },
  callback: (obj) => {
    console.log('Dados: ', obj)
    return false
  }
}

module.exports = crawler
