'use strict'

const Crawler = require('./generateCrawlerConfig')
const crawlerGeneric = require('./genericCrawlerPromise.js')(Crawler)
crawlerGeneric
  .then(Crawler.PROMISE_SUCCESS)
  .catch(Crawler.PROMISE_ERROR)

// Dados:  { Instituicao: 'UEPB (Universidade Estadual da Para�ba) ',
// Departamento: 'Biologia',
// Endereco: 'Centro de Ci�ncias Biol�gicas e da Sa�de, N�351 - Bairro: Universit�rio - CEP:58429-500 ',
// MunicipioUF: 'Campina Grande/PB ' }

