'use strict'

module.exports = ($, crawler) => {
  $(crawler.elementList).each(function(i, element){
    const abbreviation = eval(crawler.fields[0].value)
    const compound = eval(crawler.fields[1].value)
    const molecularFormula = eval(crawler.fields[2].value)
    const molarMass = eval(crawler.fields[3].value)

    let data = {
      abbreviation,
      compound,
      molecularFormula,
      molarMass
    }
    console.log('Abreviations', data)
    return data
  })
}