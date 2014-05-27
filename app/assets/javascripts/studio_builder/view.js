StudioBuilder.View = function() {
  this.playlistSongsSelector = '.search-footer-container'
  this.mainContainerSelector = '.main-container'
}

StudioBuilder.View.prototype = {
  redrawPlaylist: function( playlist ) {
    $(this.playlistSongsSelector).empty().append( playlist )
  }
}