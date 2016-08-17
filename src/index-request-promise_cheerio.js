'use strict'

const crawlerData = require('./request-promise_cheerio/crawlerData')
const crawlerConfig = require('./request-promise_cheerio/generateConfig')(crawlerData)
const crawlerGeneric = require('./request-promise_cheerio/genericCrawler')(crawlerConfig)

crawlerGeneric
  .then(crawlerConfig.PROMISE_SUCCESS)
  .catch(crawlerConfig.PROMISE_ERROR)

// Dados:  { Instituicao: 'UEPB (Universidade Estadual da Para�ba) ',
// Departamento: 'Biologia',
// Endereco: 'Centro de Ci�ncias Biol�gicas e da Sa�de, N�351 - Bairro: Universit�rio - CEP:58429-500 ',
// MunicipioUF: 'Campina Grande/PB ' }

