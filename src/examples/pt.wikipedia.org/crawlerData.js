'use strict'

const cheerio = require('cheerio')
// console.log('')
const BASE_URL = 'https://pt.wikipedia.org/wiki/%C3%81tomo'
console.log('BASE_URL', BASE_URL)
const crawler = {
  BASE_URL: BASE_URL,
  elementList: '#content',
  fieldValueType: 'css',
  fields: [
    {
      name: 'titulo',
      value: '#firstHeading'
    }
  ],
  optionsRequest: {
    uri: 'https://pt.wikipedia.org/wiki/%C3%81tomo',
    transform: function (body) {
      return cheerio.load(body)
    }
  },
  PROMISE_SUCCESS: ($) => {
    // Separei pois poderemos ter módulos apenas 
    // para isso e cada 1 será para 1 site específico
    return require('./promiseSuccess')($, crawler)
  },
  PROMISE_ERROR: (err) => {
    throw new Error(err)
  },
  options: {
    conditionGetValues: (i) => i > 0 && i < 5,
    conditionBreakList: (i) => i >= 5
  },
  callback: (obj) => {
    console.log('Dados: ', obj)
    return false
  }
}

module.exports = crawler
