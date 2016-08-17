# Generic Crawler

Crawler genérico.

**WORK IN PROGRESS!!!**

ps: Código está sendo feito em cima dessa página: [http://www.botanica.org.br/rbh-catalogo](http://www.botanica.org.br/rbh-catalogo) para iniciar.


## O Crawler

Estou criando uma função genérica para *crawlers* onde eu preciso de algumas informações para que isso seja possível, basicamente elas são:

- URL a ser buscada
- Elemento HTML a se encontrar que contenha os outros valores
- Path onde se encontram os valores

Porém só isso não adianta, então vamos ver o padrão que estou criando para esse projeto.

### O Padrão

Vamos imaginar nossa função `crawlerGeneric` como deverá ser:

```js
crawlerGeneric(BASE_URL, elementList, fields, options)
```

Com certeza você deve se perguntar:

> WTF são esses parâmetros?

**Vou explicar já já!** Antes vamos ver como ficará nossa função de *crawler*:

```js
const crawlerGeneric = (BASE_URL, elementList, fields, options, callback) => {
  myRequest
  .then(success)
  .catch(error)
}
```

![mind blow](https://media.giphy.com/media/4A49DBPhSYRTW/giphy.gif)

> SIM! Estou usando promises, mas como?

**Muito fácil!** Com o módulo `request-promise`, ficando assim:

```js
const rp = require('request-promise');
const cheerio = require('cheerio')

// Definimos os valores a serem achados
const elementList = '.tx_dados_herb'
const fields = [
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

// Definimos os valores da requisição
const BASE_URL = 'http://www.botanica.org.br/rbh-catalogo'
const optionsRequest = {
    uri: BASE_URL,
    transform: function (body) {
        return cheerio.load(body);
    }
};

// Definimos os callbacks para a Promise
const error = (err) => {
  throw new Error(err)
}
const success = ($) => {
  let Dados = []
  let obj = {}
  // Aqui pegamos todos os objetos do DOM com essa classe '.tx_dados_herb'
  $(elementList).each(function(i, element){
    // O VALOR correto vem em this.children[0].data 
    // que está em fields[i].value por isso o eval
    if(options.conditionGetValues(i)) {
      obj[fields[i].name] = eval(fields[i].value)
    }
    else if(options.conditionBreakList(i)) {
      return callback(obj)
    }
  })
}

// Definimos o options
const options = {
  conditionGetValues: (i) => i>0 && i<5,
  conditionBreakList: (i) => i >= 5
}

// Definimos o callback que executará na Promise de SUCESSO
const callback = (obj) => { 
  console.log('Dados: ', obj)
  return false // necessário para sair do EACH
}

const crawlerGeneric = (BASE_URL, elementList, fields, options, callback) => {
  rp(optionsRequest) // faz a requisição
  .then(success)
  .catch(error)
}

crawlerGeneric(BASE_URL, elementList, fields, options, callback)
```

> Claro que irei explicar parte a parte!


![TE AMO](https://media.giphy.com/media/26BRsVk2noIIPHjKU/giphy.gif)

#### BASE_URL

URL a ser pesquisada


#### elementList

Nome da classe/elemento que contém a lista dos elementos que possuem os valores desejados, por exemplo:

```js
const elementList = '.tx_dados_herb'
// ou const elementList = 'p'
```

#### fields

Array de Objetos que mapeiam o nome que você deseja pro valor com a seleção CSS ou JS, por exemplo:

```js
    const fields = [{
    name: 'Instituicao',
    value: 'this.children[0].data'
  }]
```


#### options

Objeto com valores e funções opcionais, por exemplo:

```js
const options = {
  conditionGetValues: (i) => i>0 && i<5,
  conditionBreakList: (i) => i >= 5
}
```

#### callback

## Generic Crawler

Aqui começamos nossa saga para a refatoração desse *crawler* para que ele vire um módulo externo a ser importado.

Para deixar bem atomizado nosso código separei em 4 partes:

- crawlerData 
- generateConfig
- crawlerDataFactory
- genericCrawler

Além disso devemos criar 1 pasta para cada *crawler*, por exemplo para nós será: `request-promise_cheerio`

Sempre mantendo o padrão:

```
moduloQueFazRequest_moduloQuePegaOsDados
```

Exemplos:

- request_cheerio
- request-promise_cheerio
- nightmare

Agora vamos ao que interessa, ao **COOODEGOOOO!**:

```js
const CrawlerData = require('./request-promise_cheerio/crawlerData')
const CrawlerConfig = require('./request-promise_cheerio/generateCrawlerConfig')(CrawlerData)
const crawlerGeneric = require('./request-promise_cheerio/genericCrawlerRequestCheerio')(CrawlerConfig)
crawlerGeneric
  .then(Crawler.PROMISE_SUCCESS)
  .catch(Crawler.PROMISE_ERROR)
```


### crawlerData

Módulo que exporta os dados para o *crawler*, vamos salvar em `request-promise_cheerio/crawlerData.js` o seguinte código:

```js
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

module.exports = Crawler
```

> Percebeu porque eu separei em um módulo né?

> Já imaginou ter todo esse código no seu arquivo principal?

> **Então!**
> 
### generateCrawlerConfig 

Esse módulo irá receber os dados de `crawlerData` e *setará* cada valor no `CrawlerFactory` e retornará o objeto com todas as configurações do *crawler*.

Criei esse módulo para que possamos criar *Factories* para diferentes tipos de *crawler*, nesse caso estamos usando o `request-promise` em conjunto com o `cheerio`, porém nesse módulo nenhum deles é definido ou usado para deixá-lo genérico para o futuro:

```js
const CrawlerFactory = require('./crawlerDataFactory')

module.exports = (CrawlerData) => {
  CrawlerFactory.setBASE_URL(CrawlerData.BASE_URL)
  CrawlerFactory.setElementList(CrawlerData.ElementList)
  CrawlerFactory.setFieldValueType(CrawlerData.FieldValueType)
  CrawlerFactory.setFields(CrawlerData.Fields)
  CrawlerFactory.setOptionsRequest(CrawlerData.optionsRequest)
  CrawlerFactory.setOptions(CrawlerData.options)
  CrawlerFactory.setPROMISE_SUCCESS(CrawlerData.PROMISE_SUCCESS)
  CrawlerFactory.setPROMISE_ERROR(CrawlerData.PROMISE_ERROR)
  CrawlerFactory.setcallback(CrawlerData.callback)

  return CrawlerFactory.getCrawler()
}
```

> Parece até besteira criar algo assim né? Então só aguarde quando você quiser estender seu módulo para outros *crawlers* aí sim o bicho vai pegar!

*ps: Sim farei módulos para outros tipos*

### crawlerDataFactory

### genericCrawler

Salvei esse arquivo como `genericCrawler.js` na pasta `request-promise_cheerio`

```js
const rp = require('request-promise');
const cheerio = require('cheerio')

module.exports = (Crawler) => {
  // Valores que irão para as funções internas
  // Agora todos encapsulados no objeto Crawler
  const BASE_URL = Crawler.BASE_URL
  const ElementList = Crawler.ElementList
  const Fields = Crawler.Fields
  const options = Crawler.options
  const callback = Crawler.callback

  return rp(Crawler.optionsRequest)
}
``` 