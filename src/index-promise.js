'use strict'

const request = require('request')
const rp = require('request-promise');
const cheerio = require('cheerio')

const BASE_URL = 'http://www.botanica.org.br/rbh-catalogo'
let PAGE = 2
const BASE_URL_PAGE = 'http://www.botanica.org.br/rede_herbarios.php?_pagi_pg='+PAGE

const infos = '.tx_dados_herb'

// Colocar todos os nomes dos atributos que irão para o OBJETO
// em ORDEM e quando não existir ou não quiser o valor
// COLOQUE como ''
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
};

const myRequest = rp(optionsRequest)
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

const crawlerGeneric = (BASE_URL, ElementList, Fields, options) => {
  myRequest
  .then(success)
  .catch(error)
}

const callback = (obj) => { 
  console.log('Dados: ', obj)
  return false
}
crawlerGeneric(BASE_URL, ElementList, Fields, options, callback)

// RESULTADO:
// { Instituicao: 'UEPB (Universidade Estadual da Para�ba) ',
//   Departamento: 'Biologia',
//   Endereco: 'Centro de Ci�ncias Biol�gicas e da Sa�de, N�351 - Bairro: Universit�rio - CEP:58429-500 ',
//   MunicipioUF: 'Campina Grande/PB ' }


// i 0
// this 2016-02-12 | 16:23:49 
// i 1
// this UEPB (Universidade Estadual da Para�ba) 
// i 2
// this Biologia
// i 3
// this Centro de Ci�ncias Biol�gicas e da Sa�de, N�351 - Bairro: Universit�rio - CEP:58429-500 
// i 4
// this Campina Grande/PB 
// i 5
// this  
// i 6
// this undefined
// i 7
// this undefined
// i 8
// this 1982
// i 9
// this Jos� Iranildo Miranda de Melo 
// i 10
// this undefined
// i 11
// this  
// i 12
// this undefined
// i 13
// this 2500 
// i 14
// this 01 
// i 15
// this Flora da Para�ba;
// Flora da APA do Cariri, PB; Flora de Puxinan� 
// i 16
// this Jos� Iranildo Miranda de Melo (Boraginaceae)
 
// i 17
// this  
// i 18
// this Sim 
// i 19
// this N�o informado 


// Instituicao:  '.tx_dados_herb' //Fundacao Jardim Botanico de Pocos de Caldas
// Departamento: Departamento Tecnico-cientifico
// Endereco: Rua Paulo de Oliveira, Nº320 - Bairro: Parque Veu das Noivas - CEP:37704-377
// Município/UF: Poços de Caldas/MG
// Telefone: (35)-3715-6054
// Email herbário:  herbarioafr.fjbpc@gmail.com
// Site: http://jardimbotanico.pocosdecaldas.mg.gov.br/
// Fundacaoo: 2013
   
// CuradorName: Eric Arruda Williams
// CuradorEmail curador: ericarrudawilliams@hotmail.com
   
// Acervo: 3700
// NumMateriaisTipo:  0
// Coleoees: Flora do Planalto de Pocos de Caldas e regiao
// Especialistas:  Eric Arruda Williams (Pteridofitas),Sueli Nicolau (Lauraceae), Joao Paulo de Lima Braga (Angiospermas)
   
// Periodico:  Revista Regnellea Scientia
// Informatizando: Sim
// Programa: Excel / Brahms