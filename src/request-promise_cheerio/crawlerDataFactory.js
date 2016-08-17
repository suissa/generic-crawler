'use strict';

let crawler = {}

exports.setBASE_URL = function (val) { crawler.BASE_URL = val }
exports.getBASE_URL = function (val) { return crawler.BASE_URL }

exports.setElementList = function(val) { crawler.elementList = val}
exports.getElementList = function() { return crawler.elementList }

exports.setFieldValueType = function(val) { crawler.fieldValueType = val}
exports.getFieldValueType = function() { return crawler.fieldValueType }

exports.setFields = function(val) { crawler.fields = val}
exports.getFields = function() { return crawler.fields }

exports.setOptionsRequest = function(val) { crawler.optionsRequest = val}
exports.getOptionsRequest = function() { return crawler.optionsRequest }

exports.setOptions = function(val) { crawler.options = val}
exports.getOptions = function() { return crawler.options }

exports.setPROMISE_SUCCESS = function(val) { crawler.PROMISE_SUCCESS = val}
exports.getPROMISE_SUCCESS = function() { return crawler.PROMISE_SUCCESS }

exports.setPROMISE_ERROR = function(val) { crawler.PROMISE_ERROR = val}
exports.getPROMISE_ERROR = function() { return crawler.PROMISE_ERROR }

exports.setcallback = function(val) { crawler.callback = val}
exports.getcallback = function() { return crawler.callback }

exports.getCrawler = function() { return crawler }
