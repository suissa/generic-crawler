'use strict'

module.exports = ($, crawler) => {
  $(crawler.elementList).each(function(i, element){
    const name = eval(crawler.fields[0].value)
    const formula = eval(crawler.fields[1].value)
    const molarMass = eval(crawler.fields[2].value)
    const density = eval(crawler.fields[3].value)
    console.log('crawler.fields[2].value', crawler.fields[2].value)
    let data = {
      name,
      formula,
      molarMass,
      density
    }
    console.log('Compounds', data)
    return data
  })
}