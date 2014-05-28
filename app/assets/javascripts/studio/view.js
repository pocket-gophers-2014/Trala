Studio.View = function(){
	this.mainContainer = '.main-container'
  this.playlistSongsSelector = '.search-footer-container'
}

Studio.View.prototype = {
	draw: function(playerTemplate) {
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
