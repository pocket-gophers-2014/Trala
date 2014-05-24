Studio.View = function(){
	this.contentSelector = '.content'
}

Studio.View.prototype = {
	drawInitial: function(song) {
		$(this.contentSelector).empty.append(song)
	}
}