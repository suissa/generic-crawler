'use strict'

const cheerio = require('cheerio')
const BASE_URL = 'http://www.periodni.com/abbreviations_of_chemicals.html'
const crawler = {
  BASE_URL: BASE_URL,
  elementList: 'table tr',
  fieldValueType: 'js',
  fields: [
    {
      name: 'nome',
      value: "$(this).children('td').eq(2).text()"
    },
    {
      name: 'formula',
      value: "$(this).children('td').eq(3).text()"
    },
    {
      name: 'molarMass',
      value: "$(this).children('td').eq(4).text()"
    },
    {
      name: 'density',
      value: "$(this).children('td').eq(5).text()"
    }
  ],
  optionsRequest: {
    uri: BASE_URL,
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