Studio.View = function(){
	this.mainContainer = '.main-container'
  this.playlistSongsSelector = '.search-footer-container'
}

Studio.View.prototype = {
	draw: function(playerTemplate) {
    debugger
    // this.changeHTMLColorEvent()
		$(this.mainContainer).empty().append(playerTemplate)
	},

  redrawPlaylist: function(playlist) {
    $(this.playlistSongsSelector).empty().append(playlist)
  },

  changeHTMLColorEvent: function() {
    $('html').css( 'background', 'red' )
  }
}



 // change the color
// var backgroundChange = function(color) { $('html').css('background', color ) }

