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
crawlerGeneric(BASE_URL, ElementList, Fields, options)
```

Com certeza você deve se perguntar:

> WTF são esses parâmetros?

**Vou explicar já já!** Antes vamos ver como ficará nossa função de *crawler*:

```js
const crawlerGeneric = (BASE_URL, ElementList, Fields, options, callback) => {
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

const crawlerGeneric = (BASE_URL, ElementList, Fields, options, callback) => {
  rp(optionsRequest) // faz a requisição
  .then(success)
  .catch(error)
}

crawlerGeneric(BASE_URL, ElementList, Fields, options, callback)
```

> Claro que irei explicar parte a parte!


![TE AMO](https://media.giphy.com/media/26BRsVk2noIIPHjKU/giphy.gif)

#### BASE_URL

URL a ser pesquisada


#### ElementList

Nome da classe/elemento que contém a lista dos elementos que possuem os valores desejados, por exemplo:

```js
const ElementList = '.tx_dados_herb'
// ou const ElementList = 'p'
```

#### Fields

Array de Objetos que mapeiam o nome que você deseja pro valor com a seleção CSS ou JS, por exemplo:

```js
    const Fields = [{
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