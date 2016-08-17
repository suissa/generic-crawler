'use strict'

const rp = require('request-promise')
const cheerio = require('cheerio')

const Crawler = {
  BASE_URL: 'http://www.botanica.org.br/rbh-catalogo',
  ElementList: '.tx_dados_herb',
  FieldValueType: 'js',
  Fields: [
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
    // console.log('Crawler.ElementList', Crawler.ElementList)
    $(Crawler.ElementList).each(function(i, element){
      // O VALOR correto vem em this.children[0].data 
      // que está em Fields[i].value por isso o eval
      if(Crawler.options.conditionGetValues(i)) {
        if(Crawler.FieldValueType === 'js') obj[Crawler.Fields[i].name] = eval(Crawler.Fields[i].value)
        else obj[Crawler.Fields[i].name] = Crawler.Fields[i].value
      }
      else if(Crawler.options.conditionBreakList(i)) {
        return Crawler.callback(obj)
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

const crawlerGeneric = require('./genericCrawler.js')(Crawler)
crawlerGeneric
  .then(Crawler.PROMISE_SUCCESS)
  .catch(Crawler.PROMISE_ERROR)

// Dados:  { Instituicao: 'UEPB (Universidade Estadual da Para�ba) ',
// Departamento: 'Biologia',
// Endereco: 'Centro de Ci�ncias Biol�gicas e da Sa�de, N�351 - Bairro: Universit�rio - CEP:58429-500 ',
// MunicipioUF: 'Campina Grande/PB ' }

