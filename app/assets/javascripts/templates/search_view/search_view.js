function SearchView() {}

SearchView.prototype = {

  generateSearchBox: function(query) {
     var source = $('#search-template').html();
    var template = Handlebars.compile(source);
    var context = {query: query}
    var html = template(context)
    $(".container").append(html)
  },

  clearContainer: function() {
    $(".search-container").empty()
  },

  rendexSearchResult: function(json) {
    var source = $('#search-result').html();
    var template = Handlebars.complie(source);
    var context = {result: result}
    var html = template(context)
    $(".container").append(html)
  }
}