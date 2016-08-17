'use strict'

const CrawlerData = require('./request-promise_cheerio/crawlerData')
const CrawlerConfig = require('./request-promise_cheerio/generateConfig')(CrawlerData)
const crawlerGeneric = require('./request-promise_cheerio/genericCrawler')(CrawlerConfig)
crawlerGeneric
  .then(CrawlerConfig.PROMISE_SUCCESS)
  .catch(CrawlerConfig.PROMISE_ERROR)

// Dados:  { Instituicao: 'UEPB (Universidade Estadual da Para�ba) ',
// Departamento: 'Biologia',
// Endereco: 'Centro de Ci�ncias Biol�gicas e da Sa�de, N�351 - Bairro: Universit�rio - CEP:58429-500 ',
// MunicipioUF: 'Campina Grande/PB ' }

