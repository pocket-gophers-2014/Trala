Search.View = function(){
	this.searchResultsSelector
}

Search.View.prototype = {
	drawInitial: function(widgetTemplate) {
		$('body').append(widgetTemplate);
	},

	redraw: function(resultsTemplate) {
		$(this.searchResultsSelector).empty().append(resultsTemplate)
	}
}