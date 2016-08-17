
const cheerio = require('cheerio')

var Crawler = {}

// Make sure your argument name doesn't conflict with variables set above
exports.setBASE_URL = function (val) {
  Crawler.BASE_URL = val;
}
exports.getBASE_URL = function (val) {
  return Crawler.BASE_URL;
}

exports.setElementList = function(val) { Crawler.ElementList = val}

exports.getElementList = function() { return Crawler.ElementList }

exports.setFieldValueType = function(val) { Crawler.FieldValueType = val}

exports.getFieldValueType = function() { return Crawler.FieldValueType }

exports.setFields = function(val) { Crawler.Fields = val}

exports.getFields = function() { return Crawler.Fields }

exports.setOptionsRequest = function(val) { Crawler.optionsRequest = val}

exports.getOptionsRequest = function() { return Crawler.optionsRequest }

exports.setOptions = function(val) { Crawler.options = val}

exports.getOptions = function() { return Crawler.options }

exports.setPROMISE_SUCCESS = function(val) { Crawler.PROMISE_SUCCESS = val}

exports.getPROMISE_SUCCESS = function() { return Crawler.PROMISE_SUCCESS }

exports.setPROMISE_ERROR = function(val) { Crawler.PROMISE_ERROR = val}

exports.getPROMISE_ERROR = function() { return Crawler.PROMISE_ERROR }

exports.setcallback = function(val) { Crawler.callback = val}

exports.getcallback = function() { return Crawler.callback }

exports.getCrawler = function() { return Crawler }



// function Factory() {
//   // Config padrão
//   this.Crawler = {}
//   // this.Crawler.BASE_URL = ''
//   this.Crawler.FieldValueType = 'js'
//   this.Crawler.ElementList = ''
//   this.Crawler.Fields = ''
//   this.Crawler.optionsRequest = ''
//   this.Crawler.options = ''
//   this.Crawler.PROMISE_SUCCESS = ''
//   this.Crawler.PROMISE_ERROR = ''
//   this.Crawler.callback = ''
//   return{
//     setBASE_URL: function(url) { this.Crawler.BASE_URL = url},
//     getBASE_URL: function() { return this.Crawler.BASE_URL },
//     setElementList: function(val) { this.Crawler.ElementList = val},
//     getElementList: function() { return this.Crawler.ElementList },
//     setFieldValueType: function(val) { this.Crawler.FieldValueType = val},
//     getFieldValueType: function() { return this.Crawler.FieldValueType },
//     setFields: function(val) { this.Crawler.Fields = val},
//     getFields: function() { return this.Crawler.Fields },
//     setOptionsRequest: function(val) { this.Crawler.optionsRequest = val},
//     getOptionsRequest: function() { return this.Crawler.optionsRequest },
//     setOptions: function(val) { this.Crawler.options = val},
//     getOptions: function() { return this.Crawler.options },
//     setPROMISE_SUCCESS: function(val) { this.Crawler.PROMISE_SUCCESS = val},
//     getPROMISE_SUCCESS: function() { return this.Crawler.PROMISE_SUCCESS },
//     setPROMISE_ERROR: function(val) { this.Crawler.PROMISE_ERROR = val},
//     getPROMISE_ERROR: function() { return this.Crawler.PROMISE_ERROR },
//     setcallback: function(val) { this.Crawler.callback = val},
//     getcallback: function() { return this.Crawler.callback },
//     getCrawler: function() { return this.Crawler }
//   }
// }
// module.exports = Factory