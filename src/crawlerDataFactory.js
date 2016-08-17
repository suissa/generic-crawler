'use strict';

const cheerio = require('cheerio')

let Crawler = {}

exports.setBASE_URL = function (val) { Crawler.BASE_URL = val }
exports.getBASE_URL = function (val) { return Crawler.BASE_URL }

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
