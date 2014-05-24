
Search.Controller = function( view, songManager ){
	this.view = view
	this.songManager = songManager
}

Search.Controller.prototype = {
	loadWidget: function() {
		widgetTemplate = this.buildSearchWidget()
		this.view.drawInitial( widgetTemplate );
	},

    searchSongs: function( query ) {
        this.songManager.searchSongs( query, this.updateResults )
    },

    updateResults: function( songData ) {
        resultsTemplate = this.buildResultsTemplate( songData )
        this.view.redraw( resultsTemplate )
    },

	buildSearchWidget: function() {
		return HandlebarsTemplates.search_page
	},

    buildResultsTemplate: function( songData ) {
        debugger
        var test =  HandlebarsTemplates['search_page']( songData )
        return test
    }
}
