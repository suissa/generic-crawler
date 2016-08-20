module.exports = ($, crawler) => {
  // console.log('crawler.elementList', crawler.elementList)
  console.log('AQUI: )', $('.itinerary-container'))
  $('.itinerary-container').each(function (i, element) {
    // const data = $(crawler.elementList +' span[data-ng-show=true] .row pre').text()
    console.log('element', element)
  // return data
  })
}
