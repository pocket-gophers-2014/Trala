Studio.View = function(){
	this.mainContainer = '.main-container'
}

Studio.View.prototype = {
	draw: function(playerTemplate) {
    // this.changeHTMLColorEvent()
		$(this.mainContainer).empty().append(playerTemplate)
	},

  changeHTMLColorEvent: function() {
    $('html').css( 'background', 'red' )
  }
}
