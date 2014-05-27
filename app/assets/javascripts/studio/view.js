Studio.View = function(){
	this.mainContainer = '.main-container'
  // this.playlistSongsSelector = '.search-footer-container'
}

Studio.View.prototype = {
	draw: function(playerTemplate) {
		$(this.mainContainer).empty().append(playerTemplate)
	}//,


  // promoting to the studio builder
  // redrawPlaylist: function( playlist ) {

  //   $(this.playlistSongsSelector).empty().append( playlist )
  // }
}