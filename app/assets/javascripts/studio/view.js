Studio.View = function(){
	this.contentSelector = 'body'
  this.playlistSongsSelector = '.songs'
}

Studio.View.prototype = {
	drawInitial: function(playerTemplate) {
		$(this.contentSelector).empty().append(playerTemplate)
	},

  redrawPlaylist: function(playlist) {
    $(this.playlistSongsSelector).empty().append(playlist)
  }
}