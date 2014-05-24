Search.Controller = function(view, songManager){
	this.view = view
	this.songManager = songManager
}

Search.Controller.prototype = {
	loadWidget: function() {
		widgetTemplate = buildSearchWidget()
		this.view.drawIntial(widgetTemplate);
	},

	searchSongs: function(query) {
		this.songManager.searchSongs(query, this.updateView)
	},

	updateResults: function(songData){
		resultsTemplate = this.buildResultsTemplate(data)
		this.view.redraw(resultsTemplate)
	},

	buildSearchWidget: function() {
		return HandlebarsTemplates['search_widget'](songData)
	},

	buildResultsTemplate: function(songData) {
		return HandlebarsTemplates['search_results'](songData)
	}
}