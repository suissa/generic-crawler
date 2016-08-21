'use strict'

const cheerio = require('cheerio')
const BASE_URL = 'http://www.periodni.com/solcalc-chemical_compounds.html'
const crawler = {
  BASE_URL: BASE_URL,
  elementList: 'table tr',
  fieldValueType: 'js',
  fields: [
    {
      name: 'name',
      value: "$(this).children('td').eq(1).children('a').text()"
    },
    {
      name: 'formula',
      value: "$(this).children('td').eq(2).text()"
    },
    {
      name: 'molarMass',
      value: "$(this).children('td').eq(3).text()"
    },
    {
      name: 'density',
      value: "$(this).children('td').eq(4).text()"
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
    return false
  }
}

module.exports = crawler