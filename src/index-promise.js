'use strict'

const request = require('request')
const rp = require('request-promise');
const cheerio = require('cheerio')

const BASE_URL = 'http://www.botanica.org.br/rbh-catalogo'
const BASE_URL_PAGE = 'http://www.botanica.org.br/rede_herbarios.php?_pagi_pg='

const infos = '.tx_dados_herb'

const ElementList = '.tx_dados_herb'
const Fields = [
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
]

const optionsRequest = {
    uri: BASE_URL,
    transform: function (body) {
        return cheerio.load(body);
    }
}

const error = (err) => {
  throw new Error(err)
}
const success = ($) => {
  let Dados = []
  let obj = {}
  // Aqui pegamos todos os objetos do DOM com essa classe '.tx_dados_herb'
  $(ElementList).each(function(i, element){
    // O VALOR correto vem em this.children[0].data 
    // que está em Fields[i].value por isso o eval
    if(options.conditionGetValues(i)) {
      obj[Fields[i].name] = eval(Fields[i].value)
    }
    else if(options.conditionBreakList(i)) {
      return callback(obj)
    }
  })
}

const options = {
  conditionGetValues: (i) => i>0 && i<5,
  conditionBreakList: (i) => i >= 5
}

const callback = (obj) => { 
  console.log('Dados: ', obj)
  return false
}
const crawlerGeneric = (BASE_URL, ElementList, Fields, options, callback) => {
  return rp(optionsRequest)
  .then(success)
  .catch(error)
}

crawlerGeneric(BASE_URL, ElementList, Fields, options, callback)

// Dados:  { Instituicao: 'UEPB (Universidade Estadual da Para�ba) ',
// Departamento: 'Biologia',
// Endereco: 'Centro de Ci�ncias Biol�gicas e da Sa�de, N�351 - Bairro: Universit�rio - CEP:58429-500 ',
// MunicipioUF: 'Campina Grande/PB ' }

