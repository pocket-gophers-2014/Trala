Search.View = function(){
  // the thing that we could select to find
	// this.searchResultsSelector
}

Search.View.prototype = {
	drawInitial: function(widgetTemplate) {
		$('body').append(widgetTemplate);
	},

	redraw: function(resultsTemplate) {
		$(this.searchResultsSelector).empty().append(resultsTemplate)
	}
}