$(document).ready(function() {
	var songManager = new Data.SongManager();
  var searchWidgetView = new Search.View( songManager )
  searchController = new Search.Controller( searchWidgetView,  songManager )

  // initialize  the soundcloud client
  songManager.init()

  searchWidgetView.bind()
  // Search Soundcloud

  $('.front_page_button').on( 'click', 'a', searchController.loadWidget.bind( searchController ) )

  $( 'body' ).on( 'submit', '.search-room-container', function(a) {
      a.preventDefault()
      data = $('form input').val()
      songManager.searchSongs( data, searchController.updateResults.bind( searchController ) )
  })
})