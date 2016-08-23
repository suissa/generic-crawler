'use strict';

let crawler = {}

module.exports = {
  setBASE_URL:  (val) => crawler.BASE_URL = val,
  getBASE_URL:  (val) => crawler.BASE_URL,

  setElementList: (val) => crawler.elementList = val,
  getElementList: () => crawler.elementList,

  setFieldValueType: (val) => crawler.fieldValueType = val,
  getFieldValueType: () => crawler.fieldValueType,

  setFields: (val) => crawler.fields = val,
  getFields: () => crawler.fields,

  setOptionsRequest: (val) => crawler.optionsRequest = val,
  getOptionsRequest: () => crawler.optionsRequest,

  setOptions: (val) => crawler.options = val,
  getOptions: () => crawler.options,

  setPROMISE_SUCCESS: (val) => crawler.PROMISE_SUCCESS = val,
  getPROMISE_SUCCESS: () => crawler.PROMISE_SUCCESS,

  setPROMISE_ERROR: (val) => crawler.PROMISE_ERROR = val,
  getPROMISE_ERROR: () => crawler.PROMISE_ERROR,

  setCallback: (val) => crawler.callback = val,
  getCallback: () => crawler.callback,

  getCrawler: () => crawler
}


