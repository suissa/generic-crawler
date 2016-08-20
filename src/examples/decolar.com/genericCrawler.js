const rp = require('request-promise')

module.exports = (crawler) => {
  return rp(crawler.optionsRequest)
}
