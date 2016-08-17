
module.exports = ($, crawler) => {
  $(crawler.elementList).each(function(i, element){
    const data = $(crawler.elementList +' span[data-ng-show=true] .row pre').text()
    console.log('data', data)
    return data
  })
}