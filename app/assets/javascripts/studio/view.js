Studio.View = function(){
	this.mainContainer = '.main-container'
  this.playlistSongsSelector = '.songs'
}

Studio.View.prototype = {
	draw: function(playerTemplate) {
		$(this.mainContainer).empty().append(playerTemplate)
	}

  // redrawPlaylist: function(playlist) {
  //   $(this.playlistSongsSelector).empty().append(playlist)
  // }
}