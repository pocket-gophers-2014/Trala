Studio.View = function(){
	this.mainContainer = '.main-container'
  this.playlistSongsSelector = '.search-footer-container'

  // selectors for the buttons
  // selectors for the numbers elements
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
  },

  // bind dislike and like buttons
  bindButtons: function() {
    this.bindLikeButton();
    this.bindDislikeButton();
  },

  bindLikeButton: function()  {
    $(this.mainContainer).on( 'click', this.likeSelector, function(e) {
      e.preventDefault()
      // add to like count
    }.bind(this))
  },

  bindDislikeButton: function() {
    $(this.mainContainer).on( 'click', this.dislikeSelector, function(e) {
      e.preventDefault()
      // add to dislike count
    }.bind(this))
  }

  // update color of number


}
