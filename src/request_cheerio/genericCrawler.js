'use strict'

const request = require('request')
const cheerio = require('cheerio')

module.exports = (crawlerConfig) => {
  request(crawlerConfig.BASE_URL, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      let Dados = []
      let obj = {}
      // Aqui pegamos todos os objetos do DOM com essa classe '.tx_dados_herb'
      $(crawlerConfig.elementList).each(function(i, element){
        // console.log('this.children[0].data', this.children[0].data)
        // O VALOR correto vem em this.children[0].data
        if(crawlerConfig.options.conditionGetValues(i)) {
          if(crawlerConfig.fieldValueType === 'js') {
            obj[crawlerConfig.fields[i].name] = eval(crawlerConfig.fields[i].value)
          }
          else obj[crawlerConfig.fields[i].name] = crawlerConfig.fields[i].value
        }
        else if(crawlerConfig.options.conditionBreakList(i)) {
          return crawlerConfig.callback(obj)
        }
      })
    }
  });
}