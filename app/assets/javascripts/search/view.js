Search.View = function(){
  // the thing that we could select to find
	this.searchResultsSelector = ".results-container"
}

Search.View.prototype = {
	drawInitial: function(widgetTemplate) {
		$('body').empty().append(widgetTemplate);
	},

	redraw: function(resultsTemplate) {
		$(this.searchResultsSelector).empty().append(resultsTemplate)
	}

}