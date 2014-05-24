
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
        debugger
        resultsTemplate = this.buildResultsTemplate( songData )
        this.view.redraw( resultsTemplate )
        //$(".result-container").append(resultsTemplate);
    },

	buildSearchWidget: function() {
		return HandlebarsTemplates.search_page
	},

    buildResultsTemplate: function( songData ) {
        var test =  HandlebarsTemplates['result-container']( songData )
        return test
    }

    // resultsTemplate: function(songData) {
    //     debugger
    //     var resultContainer = $(".result-container")
    //     var song_title = songData[0].title
    //     $(".result-container").append(song_title)
    // }
}
