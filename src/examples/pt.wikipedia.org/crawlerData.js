'use strict'

const cheerio = require('cheerio')
const BASE_URL = 'https://pt.wikipedia.org/wiki/javascript'
console.log('BASE_URL', BASE_URL)
const crawler = {
  BASE_URL: BASE_URL,
  elementList: '#content',
  fields: [
    {
      name: 'titulo',
      value: '#firstHeading',
      getType: 'text',
      valueType: 'css'
    },
    {
      name: 'nota',
      value: '.hatnote',
      getType: 'html',
      valueType: 'css'
    },
    {
      name: 'conteudo',
      value: '$("#mw-content-text").children("div").text()',
      getType: 'text',
      valueType: 'js' 
    }
  ],
  optionsRequest: {
    uri: BASE_URL,
    transform: function (body) {
      return cheerio.load(body)
    }
  },
  PROMISE_SUCCESS: ($) => {
    return require('./promiseSuccess')($, crawler)
  },
  PROMISE_ERROR: (err) => {
    throw new Error(err)  
  },
  options: {
  },
  callback: (obj) => {
    console.log('Dados: ', obj)
    return true
  }
}

module.exports = crawler
