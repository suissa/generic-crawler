'use strict'

const cheerio = require('cheerio')

const crawler = {
  BASE_URL: 'https://registro.br/cgi-bin/whois/?qr=testecrawler.com.br',
  elementList: '.box-cinza',
  fieldValueType: 'css',
  fields: [
    {
      name: 'dados',
      value: '.row'
    }
  ],
  optionsRequest: {
    uri: 'https://registro.br/cgi-bin/whois/?qr=floriculturasilva.com.br',
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
    conditionGetValues: (i) => i>0 && i<5,
    conditionBreakList: (i) => i >= 5
  },
  callback: (obj) => { 
    console.log('Dados: ', obj)
    return false
  }
}

module.exports = crawler