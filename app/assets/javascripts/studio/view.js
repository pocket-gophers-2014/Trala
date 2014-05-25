Studio.View = function(){
	this.contentSelector = 'body'
}

Studio.View.prototype = {
	drawInitial: function(playerTemplate) {
		$(this.contentSelector).empty().append(playerTemplate)
	}
}