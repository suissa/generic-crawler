'use strict'

const cheerio = require('cheerio')

const crawler = {
  BASE_URL: 'http://www.botanica.org.br/rbh-catalogo',
  elementList: '.tx_dados_herb',
  fieldValueType: 'js',
  fields: [
    {
      name: '',
      value: 'this.children[0].data'
    },
    {
      name: 'Instituicao',
      value: 'this.children[0].data'
    },
    {
      name: 'Departamento',
      value: 'this.children[0].data'
    },
    {
      name: 'Endereco',
      value: 'this.children[0].data'
    },
    {
      name: 'MunicipioUF',
      value: 'this.children[0].data'
    }
  ],
  optionsRequest: {
    uri: 'http://www.botanica.org.br/rbh-catalogo',
    transform: function (body) {
        return cheerio.load(body)
    }
  },
  PROMISE_SUCCESS: ($) => {
    let Dados = []
    let obj = {}
    // Aqui pegamos todos os objetos do DOM com essa classe '.tx_dados_herb'
    // console.log('crawler.elementList', crawler.elementList)
    $(crawler.elementList).each(function(i, element){
      // O VALOR correto vem em this.children[0].data 
      // que está em fields[i].value por isso o eval
      if(crawler.options.conditionGetValues(i)) {
        if(crawler.fieldValueType === 'js') obj[crawler.fields[i].name] = eval(crawler.fields[i].value)
        else obj[crawler.fields[i].name] = crawler.fields[i].value
      }
      else if(crawler.options.conditionBreakList(i)) {
        return crawler.callback(obj)
      }
    })
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