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
  if(options.multi) {
    // Busca na URL_FISRT PRIMEIRO
    // rp(optionsRequest)
    // .then(success)
    // .catch(error)
    // para depois continuar em URL_OTHERS
    for(let i=options.INDEX_START; i<=options.INDEX_END; i++) {
      optionsRequestMulti =  {
          uri: BASE_URL_PAGE+i,
          transform: function (body) {
              return cheerio.load(body);
          }
      }
      rp(optionsRequestMulti)
      .then(success)
      .catch(error)
    }
  }
  else {
    rp(optionsRequest)
    .then(success)
    .catch(error)
  }
}

// crawlerGeneric(BASE_URL, ElementList, Fields, options, callback)


let optionsRequestMulti = {
  uri: BASE_URL_PAGE+2,
  transform: function (body) {
      return cheerio.load(body);
  }
}
const optionsMulti = {
  multi: true,
  INDEX_START: 2,
  INDEX_END: 10,
  URL_FISRT: BASE_URL,
  URL_OTHERS: BASE_URL_PAGE,
  conditionGetValues: (i) => i>0 && i<5,
  conditionBreakList: (i) => i >= 5
}
// const crawlerGenericMulti = (BASE_URL_PAGE, ElementList, Fields, options, callback) => {
//     rp(optionsRequestMulti)
//     .then(success)
//     .catch(error)
//   // }
// }
crawlerGeneric(BASE_URL, ElementList, Fields, options, callback)
