'use strict'

const request = require('request')
const Nightmare = require('nightmare')

const BASE_URL = 'http://www.botanica.org.br/rbh-catalogo'
let PAGE = 2
const BASE_URL_PAGE = 'http://www.botanica.org.br/rede_herbarios.php?_pagi_pg='+PAGE

const nome = '.tx_dados_herb'

var crawler = new Nightmare()
  .viewport(1000, 1000)
  .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
  .goto(BASE_URL)
  .wait()
  .evaluate(function () {
    return {
      infos: $(nome)
    };
  },function (value) {
    console.log('evaluate value', value)
      // var filename = './' + value.name + '.zip';
      // var file = fs.createWriteStream(filename);
      // var request = http.get(value.href, function (response) {
      //   response.pipe(file);
      // });
    }
  )
  // .screenshot('screenshot.png')
  .run(function() {console.log('Done!')});

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